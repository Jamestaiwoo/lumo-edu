import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { simulateOrder, type SimOrderSide, type SimOrderType } from "@/lib/order-simulation";
import { BlockCard } from "../blocks/BlockChrome";

export function OrderTypeSimulatorView({
  title,
  prompt,
  symbol,
  unit,
  bid,
  ask,
  ticks,
  takeaway,
}: {
  title: string;
  prompt: string;
  symbol: string;
  unit: string;
  bid: number;
  ask: number;
  ticks: number[];
  takeaway: string;
}) {
  const [type, setType] = useState<SimOrderType>("market");
  const [side, setSide] = useState<SimOrderSide>("buy");
  const [limit, setLimit] = useState("20.10");
  const [tickIndex, setTickIndex] = useState(0);
  const limitPrice = Number(limit.replace(/[^0-9.-]/g, ""));

  const outcome = useMemo(
    () =>
      simulateOrder({
        type,
        side,
        bid,
        ask,
        limitPrice: Number.isFinite(limitPrice) ? limitPrice : null,
        ticks: ticks.slice(0, Math.max(tickIndex, 1)),
      }),
    [type, side, bid, ask, limitPrice, ticks, tickIndex],
  );

  return (
    <BlockCard eyebrow="Interactive · simulate" title={title}>
      <p className="text-sm leading-relaxed text-foreground/90">{prompt}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {symbol} is quoted {bid.toFixed(2)} bid / {ask.toFixed(2)} ask. Order for 100 {unit}.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["market", "limit"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setType(option);
              setTickIndex(0);
            }}
            className={`rounded-2xl border px-3 py-2 text-xs font-bold capitalize transition ${
              type === option ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(["buy", "sell"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setSide(option);
              setTickIndex(0);
            }}
            className={`rounded-2xl border px-3 py-2 text-xs font-bold capitalize transition ${
              side === option ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {type === "limit" ? (
        <label className="mt-3 block text-xs font-semibold">
          Limit price
          <Input
            inputMode="decimal"
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
              setTickIndex(0);
            }}
            className="mt-1 h-11 text-sm"
          />
        </label>
      ) : null}

      <div className="mt-3 rounded-2xl border border-border/60 bg-secondary/30 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-muted-foreground">
            Tick {Math.min(tickIndex + 1, ticks.length)} of {ticks.length}
          </span>
          <span className="font-bold">
            Bid {(ticks[Math.min(tickIndex, ticks.length - 1)] ?? bid).toFixed(2)}
          </span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {ticks.map((tick, index) => (
            <div
              key={`${tick}-${index}`}
              className={`h-6 flex-1 rounded-md ${index <= tickIndex ? "bg-primary" : "bg-secondary"}`}
              title={`Tick ${index + 1}: ${tick.toFixed(2)}`}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-10 flex-1 text-xs font-bold"
            disabled={tickIndex <= 0}
            onClick={() => setTickIndex((value) => Math.max(0, value - 1))}
          >
            Back
          </Button>
          <Button
            type="button"
            className="h-10 flex-1 text-xs font-bold"
            disabled={tickIndex >= ticks.length - 1}
            onClick={() => setTickIndex((value) => Math.min(ticks.length - 1, value + 1))}
          >
            Step market
          </Button>
        </div>
      </div>

      <div
        className={`mt-3 rounded-2xl border px-3.5 py-3 ${
          outcome.status === "filled"
            ? "border-success/40 bg-success/10"
            : "border-border/60 bg-card"
        }`}
      >
        <p className="text-xs font-bold">{outcome.headline}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{outcome.detail}</p>
        <p className="mt-2 border-t border-border/50 pt-2 text-xs leading-relaxed">
          <span className="font-bold">Takeaway: </span>
          {takeaway}
        </p>
      </div>
    </BlockCard>
  );
}
