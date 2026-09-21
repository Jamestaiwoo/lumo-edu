import { useState } from "react";
import { Check } from "lucide-react";
import type { DecisionChoice } from "@/content/course/types";
import { BlockCard } from "../blocks/BlockChrome";
import { OrderBookTable } from "../blocks/VisualPrimitives";

export function DecisionInteractionView({
  title,
  prompt,
  book,
  choices,
  takeaway,
}: {
  title: string;
  prompt: string;
  book?: {
    label: string;
    unit: string;
    bids: { price: number; size: number }[];
    asks: { price: number; size: number }[];
  };
  choices: DecisionChoice[];
  takeaway: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked !== null ? choices[picked] : undefined;

  return (
    <BlockCard eyebrow="Interactive · decide" title={title}>
      <p className="text-sm leading-relaxed text-foreground/90">{prompt}</p>
      {book ? (
        <div className="mt-3">
          <OrderBookTable book={book} caption="Use this book to reason before you pick." />
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-2">
        {choices.map((choice, index) => {
          const isPicked = picked === index;
          const cls = isPicked
            ? choice.best
              ? "border-success bg-success/10"
              : "border-warning/60 bg-warning/10"
            : "border-border bg-card hover:border-primary/50";
          return (
            <button
              key={choice.label}
              type="button"
              onClick={() => setPicked(index)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition active:scale-[0.99] ${cls}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {chosen ? (
        <div className="mt-3 rounded-2xl border border-border/60 bg-secondary/40 px-3.5 py-3">
          <p className="text-xs leading-relaxed">
            <span className="font-bold">What happens: </span>
            {chosen.outcome}
          </p>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
            <span>{chosen.feedback}</span>
          </p>
          <p className="mt-2 border-t border-border/50 pt-2 text-xs leading-relaxed">
            <span className="font-bold">Takeaway: </span>
            {takeaway}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-muted-foreground">
          Pick an option to see what the market does back. There is no score here — this is practice
          for judgement.
        </p>
      )}
    </BlockCard>
  );
}
