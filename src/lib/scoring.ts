import { quoteToUsdMultiplier, riskPerUnitInAccountCurrency } from "./market";

/**
 * Pure, shared scoring + trade-validation rules.
 * Used by the server functions (authoritative) and by unit tests.
 * The client may import these for display only — it never persists the result.
 */

export const XP_PER_LEVEL = 120;
export const COMPLETION_BONUS_XP = 10;
export const MAX_RISK_PCT = 5;
export const MAX_OPEN_POSITIONS = 5;

export function levelForXp(xp: number) {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;
}

export function isoDate(d: Date | string = new Date()) {
  const date = typeof d === "string" ? new Date(`${d}T00:00:00Z`) : d;
  return date.toISOString().slice(0, 10);
}

/** Streak advances at most once per day, using the server's date. */
export function advanceStreak(
  lastActive: string | null,
  current: number,
  today: string = isoDate(),
): { streak: number; changed: boolean } {
  const safe = Math.max(0, current);
  if (lastActive === today) return { streak: Math.max(safe, 1), changed: false };
  const yesterday = isoDate(new Date(new Date(`${today}T00:00:00Z`).getTime() - 86400000));
  if (lastActive === yesterday) return { streak: safe + 1, changed: true };
  return { streak: 1, changed: true };
}

/**
 * XP for finishing a lesson. The full reward is only ever paid once per
 * lesson — a repeat run is practice and earns nothing, so a double tap or a
 * page refresh cannot multiply XP.
 */
export function lessonXp({
  lessonXp: base,
  correct,
  total,
  alreadyRewarded,
}: {
  lessonXp: number;
  correct: number;
  total: number;
  alreadyRewarded: boolean;
}) {
  if (alreadyRewarded) return 0;
  const scored = Math.round((base * Math.max(0, correct)) / Math.max(total, 1));
  return scored + COMPLETION_BONUS_XP;
}

// ---------------------------------------------------------------- trading

export type TradeSide = "long" | "short";

export type OpenTradeCheck = {
  symbol?: string;
  side: TradeSide;
  price: number;
  stopLoss: number;
  takeProfit: number | null;
  riskPct: number;
  balance: number;
  openPositions: number;
};

export type ValidationResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** Validates an open request and recalculates quantity/risk from scratch. */
export function validateOpen(input: OpenTradeCheck): ValidationResult<{
  quantity: number;
  riskAmount: number;
  notional: number;
}> {
  const { side, price, stopLoss, takeProfit, riskPct, balance, openPositions } = input;

  if (!Number.isFinite(price) || price <= 0) return { ok: false, error: "Price is unavailable right now." };
  if (side !== "long" && side !== "short") return { ok: false, error: "Choose long or short." };
  if (openPositions >= MAX_OPEN_POSITIONS)
    return { ok: false, error: `Maximum ${MAX_OPEN_POSITIONS} open practice positions.` };
  if (!Number.isFinite(stopLoss) || stopLoss <= 0) return { ok: false, error: "Set a stop loss first." };
  if (side === "long" && stopLoss >= price) return { ok: false, error: "A long stop must sit below price." };
  if (side === "short" && stopLoss <= price) return { ok: false, error: "A short stop must sit above price." };

  if (takeProfit != null) {
    if (!Number.isFinite(takeProfit) || takeProfit <= 0)
      return { ok: false, error: "Take profit must be a positive price." };
    if (side === "long" && takeProfit <= price)
      return { ok: false, error: "A long take profit must sit above price." };
    if (side === "short" && takeProfit >= price)
      return { ok: false, error: "A short take profit must sit below price." };
  }

  if (!Number.isFinite(riskPct) || riskPct <= 0) return { ok: false, error: "Risk must be greater than zero." };
  if (riskPct > MAX_RISK_PCT)
    return { ok: false, error: `Risk is capped at ${MAX_RISK_PCT}% per trade in the simulator.` };
  if (!Number.isFinite(balance) || balance <= 0)
    return { ok: false, error: "Your practice account has no buying power left." };

  const riskBudget = (balance * riskPct) / 100;
  const perUnitRisk = riskPerUnitInAccountCurrency(input.symbol ?? "", price, stopLoss);
  if (!Number.isFinite(perUnitRisk) || perUnitRisk <= 0)
    return { ok: false, error: "Could not calculate the risk for this market." };

  const quantity = Math.floor(riskBudget / perUnitRisk);
  if (quantity < 1)
    return { ok: false, error: "That risk gives less than one unit. Widen risk or tighten the stop." };

  const notional = +(quantity * price * quoteToUsdMultiplier(input.symbol ?? "", price)).toFixed(2);
  if (notional > balance) return { ok: false, error: "Not enough buying power for that position size." };

  return {
    ok: true,
    value: { quantity, riskAmount: +(quantity * perUnitRisk).toFixed(2), notional },
  };
}

export function pnlFor(side: string, quantity: number, entry: number, exit: number) {
  const dir = side === "short" ? -1 : 1;
  return +((exit - entry) * quantity * dir).toFixed(2);
}

export function validateClose(input: { exitPrice: number; status: string }): ValidationResult<number> {
  if (input.status !== "open") return { ok: false, error: "That position is already closed." };
  if (!Number.isFinite(input.exitPrice) || input.exitPrice <= 0)
    return { ok: false, error: "Price is unavailable right now." };
  return { ok: true, value: input.exitPrice };
}
