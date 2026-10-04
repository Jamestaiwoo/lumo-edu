import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { TradePlanField } from "@/content/course/types";
import { validateTradePlanInput } from "@/lib/interaction-validation";
import { BlockCard } from "../blocks/BlockChrome";

const num = (v: string) => Number(v.replace(/[^0-9.-]/g, ""));

export function TradePlanBuilderView(p: {
  title: string;
  prompt: string;
  symbols: string[];
  fields: TradePlanField[];
  checklist: string[];
  takeaway: string;
  defaults: {
    symbol: string;
    direction: "long" | "short";
    entry: number;
    stop: number;
    target: number;
    riskPct: number;
  };
}) {
  const [symbol, setSymbol] = useState(p.defaults.symbol);
  const [dir, setDir] = useState(p.defaults.direction);
  const [vals, setVals] = useState(
    [p.defaults.entry, p.defaults.stop, p.defaults.target, p.defaults.riskPct].map(String),
  );
  const [done, setDone] = useState(p.checklist.map(() => false));
  const [entry, stop, target, risk] = [
    num(vals[0] ?? ""),
    num(vals[1] ?? ""),
    num(vals[2] ?? ""),
    num(vals[3] ?? ""),
  ];
  const validation = validateTradePlanInput({
    direction: dir,
    entry,
    stop,
    target,
    riskPct: risk,
  });
  const valid = validation.ok;
  const complete = valid && done.every(Boolean);
  return (
    <BlockCard eyebrow="Interactive · build" title={p.title}>
      <p className="text-sm leading-relaxed">{p.prompt}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.symbols.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSymbol(s)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold ${symbol === s ? "border-primary bg-primary/10" : "border-border"}`}
          >
            {s}
          </button>
        ))}
        {(["long", "short"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDir(d)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${dir === d ? "border-primary bg-primary/10" : "border-border"}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {p.fields.map((f, i) => (
          <label key={f.label} className="text-xs font-semibold">
            {f.label}
            <Input
              value={vals[i] ?? ""}
              inputMode="decimal"
              placeholder={f.placeholder}
              onChange={(e) =>
                setVals((v) => {
                  const n = [...v];
                  n[i] = e.target.value;
                  return n;
                })
              }
              className="mt-1 h-11 text-sm"
            />
          </label>
        ))}
      </div>
      {!valid ? (
        <p className="mt-3 rounded-2xl border bg-secondary/30 p-3 text-xs leading-relaxed">
          {validation.message}
          <br />
          {symbol} {dir}: entry {Number.isFinite(entry) ? entry.toFixed(2) : "—"}.
        </p>
      ) : null}
      <div className="mt-3 flex flex-col gap-2">
        {p.checklist.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() =>
              setDone((v) => {
                const n = [...v];
                n[i] = !n[i];
                return n;
              })
            }
            className={`flex items-start gap-2 rounded-2xl border px-3 py-2.5 text-left text-xs ${done[i] ? "border-success/40 bg-success/10" : "border-border"}`}
          >
            <span
              className={`mt-0.5 flex size-4 items-center justify-center rounded-md border ${done[i] ? "border-success bg-success text-white" : ""}`}
            >
              {done[i] ? <Check className="size-3" /> : null}
            </span>
            {c}
          </button>
        ))}
      </div>
      {complete ? (
        <p className="mt-3 rounded-2xl border border-success/40 bg-success/10 p-3 text-xs">
          Plan complete. {p.takeaway}
        </p>
      ) : (
        <p className="mt-3 text-[11px] text-muted-foreground">
          Complete ordered levels plus every checklist item to finish.
        </p>
      )}
    </BlockCard>
  );
}
