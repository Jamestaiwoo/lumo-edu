import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { PositionSizeMission } from "@/content/course/types";
import { BlockCard } from "../blocks/BlockChrome";

function sizeFor(balance: number, riskPct: number, entry: number, stop: number): number {
  const budget = (balance * riskPct) / 100;
  const distance = Math.abs(entry - stop);
  if (!Number.isFinite(budget) || !Number.isFinite(distance) || distance <= 0) return 0;
  return Math.floor(budget / distance);
}

export function PositionSizeBuilderView({
  title,
  prompt,
  currency,
  defaults,
  mission,
  takeaway,
}: {
  title: string;
  prompt: string;
  currency: string;
  defaults: { balance: number; riskPct: number; entry: number; stop: number };
  mission: PositionSizeMission;
  takeaway: string;
}) {
  const [balance, setBalance] = useState(String(defaults.balance));
  const [entry, setEntry] = useState(String(defaults.entry));
  const [stop, setStop] = useState(String(defaults.stop));
  const [riskPct, setRiskPct] = useState(defaults.riskPct);

  const parsed = useMemo(() => {
    const numeric = {
      balance: Number(balance.replace(/[^0-9.-]/g, "")),
      entry: Number(entry.replace(/[^0-9.-]/g, "")),
      stop: Number(stop.replace(/[^0-9.-]/g, "")),
    };
    const budget = Number.isFinite(numeric.balance) ? (numeric.balance * riskPct) / 100 : NaN;
    const distance =
      Number.isFinite(numeric.entry) && Number.isFinite(numeric.stop)
        ? Math.abs(numeric.entry - numeric.stop)
        : NaN;
    const shares = sizeFor(numeric.balance, riskPct, numeric.entry, numeric.stop);
    const lossAtStop = Number.isFinite(distance) ? shares * distance : NaN;
    return { ...numeric, budget, distance, shares, lossAtStop };
  }, [balance, entry, stop, riskPct]);

  const success =
    Number.isFinite(parsed.shares) &&
    parsed.shares >= mission.minShares &&
    parsed.shares <= mission.maxShares;
  const showHint = !success && Number.isFinite(parsed.shares);

  return (
    <BlockCard eyebrow="Interactive · calculator" title={title}>
      <p className="text-sm leading-relaxed text-foreground/90">{prompt}</p>
      <p className="mt-2 rounded-2xl bg-secondary/50 px-3.5 py-3 text-xs leading-relaxed">
        {mission.prompt}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="text-xs font-semibold">
          Balance ({currency})
          <Input
            value={balance}
            inputMode="decimal"
            onChange={(event) => setBalance(event.target.value)}
            className="mt-1 h-11 text-sm"
          />
        </label>
        <label className="text-xs font-semibold">
          Entry
          <Input
            value={entry}
            inputMode="decimal"
            onChange={(event) => setEntry(event.target.value)}
            className="mt-1 h-11 text-sm"
          />
        </label>
        <label className="text-xs font-semibold">
          Stop
          <Input
            value={stop}
            inputMode="decimal"
            onChange={(event) => setStop(event.target.value)}
            className="mt-1 h-11 text-sm"
          />
        </label>
        <div className="text-xs font-semibold">
          Risk {riskPct.toFixed(2)}%
          <div className="mt-3 px-1">
            <Slider
              value={[riskPct]}
              min={0.1}
              max={5}
              step={0.1}
              onValueChange={(value) => setRiskPct(value[0] ?? riskPct)}
            />
          </div>
        </div>
      </div>

      <div
        className={`mt-3 rounded-2xl border px-3.5 py-3 ${success ? "border-success/40 bg-success/10" : "border-border/60 bg-card"}`}
      >
        <p className="text-xs text-muted-foreground">
          Risk budget{" "}
          {Number.isFinite(parsed.budget) ? `${parsed.budget.toFixed(2)} ${currency}` : "—"} · stop
          distance {Number.isFinite(parsed.distance) ? parsed.distance.toFixed(2) : "—"}
        </p>
        <p className="mt-1 text-lg font-bold">
          {Number.isFinite(parsed.shares)
            ? `${parsed.shares.toLocaleString("en-US")} shares`
            : "Enter valid numbers"}
        </p>
        <p className="text-xs text-muted-foreground">
          Loss if stopped:{" "}
          {Number.isFinite(parsed.lossAtStop) ? `${parsed.lossAtStop.toFixed(2)} ${currency}` : "—"}
        </p>
        {success ? (
          <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed">
            <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
            <span>{mission.success}</span>
          </p>
        ) : showHint ? (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{mission.retry}</p>
        ) : null}
      </div>
      <p className="mt-2 rounded-2xl border border-border/60 bg-secondary/40 px-3.5 py-3 text-xs leading-relaxed">
        <span className="font-bold">Takeaway: </span>
        {takeaway}
      </p>
    </BlockCard>
  );
}
