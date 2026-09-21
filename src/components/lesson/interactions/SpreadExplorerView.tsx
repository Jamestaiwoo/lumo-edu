import { useMemo, useState } from "react";
import type { SpreadLevel } from "@/content/course/types";
import { BlockCard, WhyItMatters } from "../blocks/BlockChrome";

export function SpreadExplorerView({
  title,
  prompt,
  caption,
  unit,
  levels,
  takeaway,
}: {
  title: string;
  prompt: string;
  caption: string;
  unit: string;
  levels: SpreadLevel[];
  takeaway: string;
}) {
  const [index, setIndex] = useState(1);
  const level = levels[index] ?? levels[0]!;
  const spread = level.ask - level.bid;
  const roundTripPct = level.bid > 0 ? (spread / level.bid) * 100 : 0;

  const comparison = useMemo(
    () =>
      levels.map((candidate) => ({
        name: candidate.name,
        roundTripPct:
          candidate.bid > 0 ? ((candidate.ask - candidate.bid) / candidate.bid) * 100 : 0,
      })),
    [levels],
  );

  return (
    <BlockCard eyebrow="Interactive · explore" title={title}>
      <p className="text-sm leading-relaxed text-foreground/90">{prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {levels.map((candidate, candidateIndex) => (
          <button
            key={candidate.name}
            type="button"
            onClick={() => setIndex(candidateIndex)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-[0.98] ${
              candidateIndex === index
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground"
            }`}
          >
            {candidate.name}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-border/60 bg-secondary/30 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {level.name}
        </p>
        <p className="text-xs text-muted-foreground">{level.note}</p>
        <div className="mt-2 flex items-stretch gap-2 text-center">
          <div className="flex-1 rounded-xl bg-card px-2 py-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Bid</p>
            <p className="text-base font-bold">{level.bid.toFixed(2)}</p>
          </div>
          <div className="flex-1 rounded-xl bg-card px-2 py-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Ask</p>
            <p className="text-base font-bold">{level.ask.toFixed(2)}</p>
          </div>
          <div className="flex-1 rounded-xl bg-primary/10 px-2 py-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Spread</p>
            <p className="text-base font-bold">{spread.toFixed(2)}</p>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed">
          A round trip pays the spread twice —{" "}
          <span className="font-bold">{roundTripPct.toFixed(2)}% of the price</span> (quoted in{" "}
          {unit}).
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {comparison.map((row) => (
          <div key={row.name} className="flex items-center gap-2 text-[11px]">
            <span className="w-36 shrink-0 truncate text-muted-foreground">{row.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(Math.max((row.roundTripPct / 13) * 100, 2), 100)}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right font-bold">
              {row.roundTripPct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{caption}</p>
      <WhyItMatters>{takeaway}</WhyItMatters>
    </BlockCard>
  );
}
