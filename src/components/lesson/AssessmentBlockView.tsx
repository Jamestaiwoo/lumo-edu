import { useState } from "react";
import { Check, Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Assessment, AssessmentItem } from "@/content/course/types";
import type { Question } from "@/content/curriculum";
import { evaluateRaw, feedbackForAnswer } from "@/lib/lesson-feedback";
import { BlockCard } from "./blocks/BlockChrome";

export type BlockAnswers = Record<string, string>;

function ItemInput({
  q,
  value,
  locked,
  onPick,
  onType,
}: {
  q: Question;
  value: string | undefined;
  locked: boolean;
  onPick: (i: number) => void;
  onType: (v: string) => void;
}) {
  if (q.type === "numeric") {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={value ?? ""}
          disabled={locked}
          inputMode="decimal"
          placeholder="Type your answer"
          onChange={(e) => onType(e.target.value)}
          className="h-12 text-base"
        />
        {q.unit ? <span className="text-xs text-muted-foreground">{q.unit}</span> : null}
      </div>
    );
  }
  const options = q.type === "mcq" ? q.options : ["True", "False"];
  const picked = value === undefined || value === "" ? null : Number(value);
  const answerIdx = q.type === "mcq" ? q.answer : q.answer ? 0 : 1;
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt, i) => {
        const cls = !locked
          ? picked === i
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50"
          : i === answerIdx
            ? "border-success bg-success/10"
            : picked === i
              ? "border-destructive bg-destructive/10"
              : "border-border opacity-60";
        return (
          <button
            key={opt}
            type="button"
            disabled={locked}
            onClick={() => onPick(i)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${cls}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function AssessmentItemView({
  item,
  answers,
  locked,
  onAnswer,
}: {
  item: AssessmentItem;
  answers: BlockAnswers;
  locked: boolean;
  onAnswer: (questionId: string, raw: string) => void;
}) {
  const q = item.question;
  const value = answers[q.id];
  const done = value !== undefined && value !== "";
  const correct = done && evaluateRaw(q, value);
  return (
    <div className="rounded-2xl border border-border/60 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-relaxed">{q.prompt}</p>
        {item.skill ? (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
            {item.skill}
          </span>
        ) : null}
      </div>
      <div className="mt-2.5">
        <ItemInput
          q={q}
          value={value}
          locked={locked}
          onPick={(i) => onAnswer(q.id, String(i))}
          onType={(v) => onAnswer(q.id, v)}
        />
      </div>
      {item.hint && !done ? (
        <p className="mt-2 flex gap-1.5 text-[11px] text-muted-foreground">
          <Lightbulb className="size-3.5 shrink-0" />
          {item.hint}
        </p>
      ) : null}
      {locked && done ? (
        <div
          className={`mt-2.5 rounded-xl border p-3 ${correct ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10"}`}
        >
          <p
            className={`flex items-center gap-1.5 text-xs font-bold ${correct ? "text-success" : "text-destructive"}`}
          >
            {correct ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            {correct ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1 text-xs leading-relaxed">
            {correct ? q.explain : feedbackForAnswer(item, value)}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function AssessmentBlockView({
  title,
  eyebrow,
  intro,
  assessment,
  answers,
  locked,
  allowRetryGlobal,
  onAnswer,
}: {
  title: string;
  eyebrow: string;
  intro?: string | undefined;
  assessment: Assessment;
  answers: BlockAnswers;
  locked: boolean;
  allowRetryGlobal: boolean;
  onAnswer: (questionId: string, raw: string) => void;
}) {
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const answered = assessment.items.filter((it) => {
    const v = answers[it.question.id];
    return v !== undefined && v !== "";
  }).length;
  const total = assessment.items.length;
  const complete = answered === total;
  const retryable = (assessment.allowRetry ?? allowRetryGlobal) && revealed;
  const showAll = locked || revealed;
  return (
    <BlockCard eyebrow={eyebrow} title={title}>
      {intro ? <p className="text-xs leading-relaxed text-muted-foreground">{intro}</p> : null}
      <div className="mt-3 flex flex-col gap-3">
        {assessment.items.map((item) => (
          <AssessmentItemView
            key={item.question.id}
            item={item}
            answers={answers}
            locked={showAll || (locked && complete)}
            onAnswer={onAnswer}
          />
        ))}
      </div>
      {!showAll ? (
        <Button
          type="button"
          variant="secondary"
          className="mt-3 h-11 w-full text-xs font-bold"
          disabled={!complete}
          onClick={() => {
            setRevealed(true);
            setAttempts((a) => a + 1);
          }}
        >
          Check answers{attempts > 0 ? ` (attempt ${attempts + 1})` : ""} · {answered}/{total}{" "}
          answered
        </Button>
      ) : retryable && !locked ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-2 h-10 w-full text-xs"
          onClick={() => setRevealed(false)}
        >
          Retry these questions
        </Button>
      ) : null}
      {locked ? (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Locked in for grading. Your answers above feed the lesson result.
        </p>
      ) : null}
    </BlockCard>
  );
}
