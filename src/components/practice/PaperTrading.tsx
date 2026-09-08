import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INSTRUMENTS, priceAt, pnlFor, seriesFor } from "@/lib/market";
import { money } from "@/lib/game";
import { useCloseTrade, useOpenTrade, useProfile, useTrades } from "@/lib/api";

export function PaperTrading() {
  const { data: profile } = useProfile();
  const { data: trades = [] } = useTrades();
  const open = useOpenTrade();
  const close = useCloseTrade();

  const [symbol, setSymbol] = useState(INSTRUMENTS[0]!.symbol);
  const [side, setSide] = useState<"long" | "short">("long");
  const [riskPct, setRiskPct] = useState("1");
  const [stop, setStop] = useState("");
  const [take, setTake] = useState("");
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const price = priceAt(symbol);
  const series = seriesFor(symbol, 48);
  const balance = Number(profile?.cash_balance ?? 10000);
  const stopNum = Number(stop) || 0;
  const riskAmount = (balance * (Number(riskPct) || 0)) / 100;
  const perShare = stopNum > 0 ? Math.abs(price - stopNum) : 0;
  const qty = perShare > 0 ? Math.floor(riskAmount / perShare) : 0;

  const openTrades = trades.filter((t) => t.status === "open");
  const closedTrades = trades.filter((t) => t.status === "closed");
  const openPnl = openTrades.reduce(
    (sum, t) => sum + pnlFor(t.side, Number(t.quantity), Number(t.entry_price), priceAt(t.symbol)),
    0,
  );
  const realised = closedTrades.reduce((s, t) => s + Number(t.pnl ?? 0), 0);
  const wins = closedTrades.filter((t) => Number(t.pnl ?? 0) > 0).length;

  const stopWrongSide =
    stopNum > 0 && ((side === "long" && stopNum >= price) || (side === "short" && stopNum <= price));

  async function placeTrade() {
    if (!stopNum) {
      toast.error("Set a stop loss first — that's the rule here.");
      return;
    }
    if (stopWrongSide) {
      toast.error(side === "long" ? "A long stop must sit below price." : "A short stop must sit above price.");
      return;
    }
    if (qty < 1) {
      toast.error("That risk gives less than one share. Widen risk or tighten the stop.");
      return;
    }
    if (Number(riskPct) > 5) {
      toast.error("Risk is capped at 5% per trade in the simulator.");
      return;
    }
    if (openTrades.length >= 5) {
      toast.error("Maximum 5 open practice positions.");
      return;
    }

    await open.mutateAsync({
      symbol,
      side,
      quantity: qty,
      entry_price: price,
      stop_loss: stopNum,
      take_profit: Number(take) || null,
      risk_amount: +riskAmount.toFixed(2),
    });
    setStop("");
    setTake("");
    toast.success(`Simulated ${side} ${qty} ${symbol} @ ${price}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="surface rounded-2xl border border-border/60 p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Simulated cash</p>
            <p className="text-2xl font-bold">{money(balance)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Open P&amp;L</p>
            <p className={`text-lg font-bold ${openPnl >= 0 ? "text-success" : "text-destructive"}`}>
              {openPnl >= 0 ? "+" : ""}
              {money(openPnl)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Virtual money and simulated prices. No real orders are ever placed.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
          {INSTRUMENTS.map((i) => (
            <button
              key={i.symbol}
              type="button"
              onClick={() => setSymbol(i.symbol)}
              className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                symbol === i.symbol ? "border-primary bg-primary/10 text-primary" : "border-border"
              }`}
            >
              {i.symbol}
            </button>
          ))}
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          <div>
            <p className="text-sm font-bold">{INSTRUMENTS.find((i) => i.symbol === symbol)?.name}</p>
            <p className="text-xs text-muted-foreground">Simulated instrument</p>
          </div>
          <p className="text-2xl font-bold">{price.toFixed(2)}</p>
        </div>

        <div className="mt-3 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Line type="monotone" dataKey="price" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["long", "short"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`rounded-xl border py-2.5 text-sm font-bold capitalize ${
                side === s ? "border-primary bg-primary/10 text-primary" : "border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Field label="Risk %" value={riskPct} onChange={setRiskPct} />
          <Field label="Stop loss" value={stop} onChange={setStop} placeholder={(price * (side === "long" ? 0.97 : 1.03)).toFixed(2)} />
          <Field label="Take profit" value={take} onChange={setTake} placeholder="optional" />
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Size: <span className="font-semibold text-foreground">{qty} shares</span> · risking {money(riskAmount)}
        </p>

        <Button className="mt-3 h-12 w-full font-bold" onClick={placeTrade} disabled={open.isPending}>
          {open.isPending ? "Placing…" : `Place simulated ${side}`}
        </Button>
      </div>

      <section>
        <h3 className="mb-2 text-sm font-bold">Open positions</h3>
        {openTrades.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
            No open practice positions.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {openTrades.map((t) => {
              const cur = priceAt(t.symbol);
              const pnl = pnlFor(t.side, Number(t.quantity), Number(t.entry_price), cur);
              return (
                <li key={t.id} className="rounded-2xl border border-border/60 bg-card p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">
                        {t.symbol} <span className="text-xs font-medium capitalize text-muted-foreground">{t.side}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(t.quantity)} @ {Number(t.entry_price).toFixed(2)} · stop{" "}
                        {t.stop_loss ? Number(t.stop_loss).toFixed(2) : "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${pnl >= 0 ? "text-success" : "text-destructive"}`}>
                        {pnl >= 0 ? "+" : ""}
                        {money(pnl)}
                      </p>
                      <p className="text-xs text-muted-foreground">now {cur.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-3 h-9 w-full text-xs font-semibold"
                    disabled={close.isPending}
                    onClick={async () => {
                      const p = await close.mutateAsync({ trade: t, exitPrice: cur });
                      toast.success(`Closed ${t.symbol} for ${p >= 0 ? "+" : ""}${money(p)}`);
                    }}
                  >
                    Close position
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {closedTrades.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-bold">
            History{" "}
            <span className="text-xs font-medium text-muted-foreground">
              · {wins}/{closedTrades.length} winners · realised {money(realised)}
            </span>
          </h3>
          <ul className="flex flex-col gap-2">
            {closedTrades.slice(0, 10).map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-3.5 py-2.5 text-xs">
                <span>
                  <span className="font-bold">{t.symbol}</span> <span className="capitalize text-muted-foreground">{t.side}</span>{" "}
                  {Number(t.entry_price).toFixed(2)} → {Number(t.exit_price ?? 0).toFixed(2)}
                </span>
                <span className={`font-bold ${Number(t.pnl) >= 0 ? "text-success" : "text-destructive"}`}>
                  {Number(t.pnl) >= 0 ? "+" : ""}
                  {money(Number(t.pnl ?? 0))}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-muted-foreground">{label}</Label>
      <Input inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-10" />
    </div>
  );
}
