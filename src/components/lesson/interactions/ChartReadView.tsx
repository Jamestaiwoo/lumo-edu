import { useState } from "react";
import { Check } from "lucide-react";
import type { Candle, ChartTask, ChartZone } from "@/content/course/types";
import { CandleChart } from "../blocks/ChartVisuals";
import { BlockCard } from "../blocks/BlockChrome";

export function ChartReadView({
  title,
  prompt,
  label,
  candles,
  zones,
  tasks,
  takeaway,
}: {
  title: string;
  prompt: string;
  label: string;
  candles: Candle[];
  zones?: ChartZone[] | undefined;
  tasks: ChartTask[];
  takeaway: string;
}) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const answered = tasks.filter(
    (_, index) => answers[index] !== undefined && answers[index] !== null,
  ).length;

  return (
    <BlockCard eyebrow="Interactive · read the chart" title={title}>
      <p className="text-sm leading-relaxed text-foreground/90">{prompt}</p>
      <div className="mt-3">
        <CandleChart
          label={label}
          candles={candles}
          zones={zones ?? []}
          caption="Describe first, conclude second. Every task below can be answered from these candles alone."
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {tasks.map((task, taskIndex) => {
          const picked = answers[taskIndex] ?? null;
          return (
            <div key={task.prompt} className="rounded-2xl border border-border/60 p-3.5">
              <p className="text-sm font-semibold leading-relaxed">{task.prompt}</p>
              <div className="mt-2 flex flex-col gap-2">
                {task.options.map((option, optionIndex) => {
                  const isPicked = picked === optionIndex;
                  const cls =
                    picked === null
                      ? "border-border bg-card hover:border-primary/50"
                      : optionIndex === task.answer
                        ? "border-success bg-success/10"
                        : isPicked
                          ? "border-destructive bg-destructive/10"
                          : "border-border/60 bg-card opacity-70";
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [taskIndex]: optionIndex }))}
                      className={`rounded-xl border px-3 py-2 text-left text-xs leading-relaxed transition ${cls}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {picked !== null ? (
                <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                  <span>{task.explain}</span>
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        {answered}/{tasks.length} explored. This interaction is ungraded — the checks later in the
        lesson are what count.
      </p>
      <p className="mt-2 rounded-2xl border border-border/60 bg-secondary/40 px-3.5 py-3 text-xs leading-relaxed">
        <span className="font-bold">Takeaway: </span>
        {takeaway}
      </p>
    </BlockCard>
  );
}
