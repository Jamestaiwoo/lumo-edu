import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { INSTRUMENTS, pnlFor } from "./market";
import { getMarketSnapshot, type MarketInterval } from "./market-data.server";
import { MAX_OPEN_POSITIONS, validateClose, validateOpen, type TradeSide } from "./scoring";

export type PaperAccount = {
  user_id: string;
  starting_balance: number;
  current_balance: number;
};

async function ensureAccount(
  supabase: Pick<SupabaseClient, "from">,
  userId: string,
): Promise<PaperAccount> {
  const { data, error } = await supabase
    .from("paper_accounts")
    .select("user_id, starting_balance, current_balance")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (data) {
    return {
      user_id: data.user_id,
      starting_balance: Number(data.starting_balance),
      current_balance: Number(data.current_balance),
    };
  }
  const { data: created, error: insErr } = await supabase
    .from("paper_accounts")
    .insert({ user_id: userId })
    .select("user_id, starting_balance, current_balance")
    .single();
  if (insErr || !created) throw new Error(insErr?.message ?? "Could not create practice account");
  return {
    user_id: created.user_id,
    starting_balance: Number(created.starting_balance),
    current_balance: Number(created.current_balance),
  };
}

export const getPaperAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PaperAccount> =>
    ensureAccount(context.supabase, context.userId),
  );

/**
 * Get current live price for a symbol
 * Server-side function ensures API key stays secure
 */
export const getMarketPrice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { symbol: string }) => ({ symbol: String(input.symbol) }))
  .handler(async ({ data }) => {
    const snapshot = await getMarketSnapshot(data.symbol, "1min");
    return { symbol: data.symbol, price: snapshot.price, live: snapshot.live, fallback: !snapshot.live };
  });

export const getMarketChart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { symbol: string; interval: MarketInterval }) => ({
    symbol: String(input.symbol),
    interval: input.interval,
  }))
  .handler(async ({ data }) => getMarketSnapshot(data.symbol, data.interval));

export const openTrade = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { symbol: string; side: TradeSide; riskPct: number; stopLoss: number; takeProfit: number | null }) => ({
    symbol: String(input.symbol),
    side: input.side === "short" ? ("short" as const) : ("long" as const),
    riskPct: Number(input.riskPct),
    stopLoss: Number(input.stopLoss),
    takeProfit: input.takeProfit == null || input.takeProfit === 0 ? null : Number(input.takeProfit),
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    if (!INSTRUMENTS.some((i) => i.symbol === data.symbol)) throw new Error("Unknown instrument.");
    
    // Fetch the best available provider price through the market-data router
    const snapshot = await getMarketSnapshot(data.symbol, "1min");
    const price = snapshot.price;
    if (price <= 0) throw new Error("Market price unavailable. Try again in a moment.");
    
    const account = await ensureAccount(supabase, userId);

    const { count, error: countErr } = await supabase
      .from("paper_trades")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "open");
    if (countErr) throw new Error(countErr.message);

    const check = validateOpen({
      symbol: data.symbol,
      side: data.side,
      price,
      stopLoss: data.stopLoss,
      takeProfit: data.takeProfit,
      riskPct: data.riskPct,
      balance: account.current_balance,
      openPositions: count ?? 0,
    });
    if (!check.ok) throw new Error(check.error);

    const { data: trade, error } = await supabase
      .from("paper_trades")
      .insert({
        user_id: userId,
        account_id: userId,
        symbol: data.symbol,
        side: data.side,
        quantity: check.value.quantity,
        entry_price: price,
        stop_loss: data.stopLoss,
        take_profit: data.takeProfit,
        risk_amount: check.value.riskAmount,
        status: "open",
      })
      .select("id, quantity, entry_price")
      .single();
    if (error || !trade) throw new Error(error?.message ?? "Could not open the trade");

    await supabase.from("paper_ledger").insert({
      user_id: userId,
      trade_id: trade.id,
      kind: "open",
      amount: 0,
      balance_after: account.current_balance,
    });

    await supabase
      .from("achievements")
      .upsert({ user_id: userId, code: "first_trade" }, { onConflict: "user_id,code" });

    return {
      id: trade.id as string,
      quantity: check.value.quantity,
      entryPrice: price,
      side: data.side,
      symbol: data.symbol,
      maxOpen: MAX_OPEN_POSITIONS,
    };
  });

export const closeTrade = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { tradeId: string }) => ({ tradeId: String(input.tradeId) }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: trade, error } = await supabase
      .from("paper_trades")
      .select("id, symbol, side, quantity, entry_price, status")
      .eq("id", data.tradeId)
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!trade) throw new Error("That position no longer exists.");

    // Use the latest available market price from the configured provider chain. If every provider is unavailable,
    // the market-data layer returns an explicitly labelled simulated price so
    // paper trading remains usable without pretending it is live execution.
    const snapshot = await getMarketSnapshot(trade.symbol, "1min");
    const exitPrice = snapshot.price;
    if (exitPrice <= 0) throw new Error("Market price unavailable. Try again in a moment.");
    
    const check = validateClose({ exitPrice, status: trade.status });
    if (!check.ok) throw new Error(check.error);

    const pnl = pnlFor(
      trade.side,
      Number(trade.quantity),
      Number(trade.entry_price),
      exitPrice,
      trade.symbol,
    );

    const { error: updErr, count } = await supabase
      .from("paper_trades")
      .update({ status: "closed", exit_price: exitPrice, pnl, closed_at: new Date().toISOString() }, { count: "exact" })
      .eq("id", trade.id)
      .eq("user_id", userId)
      .eq("status", "open");
    if (updErr) throw new Error(updErr.message);
    if (count === 0) throw new Error("That position is already closed.");

    const account = await ensureAccount(supabase as never, userId);
    const newBalance = +(account.current_balance + pnl).toFixed(2);

    await supabase
      .from("paper_accounts")
      .update({ current_balance: newBalance })
      .eq("user_id", userId);

    // keep the legacy profile field in sync so nothing existing breaks
    await supabase.from("profiles").update({ cash_balance: newBalance }).eq("id", userId);

    await supabase.from("paper_ledger").insert({
      user_id: userId,
      trade_id: trade.id,
      kind: "close",
      amount: pnl,
      balance_after: newBalance,
    });

    return { pnl, exitPrice, balance: newBalance, symbol: trade.symbol as string };
  });
