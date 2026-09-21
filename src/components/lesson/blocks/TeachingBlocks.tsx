import { useState } from "react";
import { Check, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Explanation, WorkedExample } from "@/content/course/types";
import {
  BlockCard,
  CalloutBox,
  KeyTermList,
  TeachingParagraphs,
  WhyItMatters,
} from "./BlockChrome";

export function ExplainBlockView({ explanation }: { explanation: Explanation }) {
  return (
    <BlockCard eyebrow="Concept" title={explanation.heading}>
      <div className="flex flex-col gap-4">
        <WhyItMatters>{explanation.whyItMatters}</WhyItMatters>
        <TeachingParagraphs paragraphs={explanation.paragraphs} />
        {explanation.keyTerms?.length ? <KeyTermList terms={explanation.keyTerms} /> : null}
        {explanation.callouts?.map((callout) => (
          <CalloutBox key={callout.title} callout={callout} />
        ))}
      </div>
    </BlockCard>
  );
}

export function ExampleBlockView({ example }: { example: WorkedExample }) {
  return (
    <BlockCard eyebrow="Worked example" title={example.title}>
      <p className="rounded-2xl bg-secondary/50 px-3.5 py-3 text-xs leading-relaxed text-foreground/90">
        {example.setup}
      </p>
      <ol className="mt-4 flex flex-col gap-3">
        {example.steps.map((step, index) => (
          <li key={step.label} className="flex gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold">{step.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {step.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-start gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-3.5 py-3 text-xs leading-relaxed">
        <Sparkles className="mt-px size-3.5 shrink-0 text-accent" aria-hidden />
        <span>{example.takeaway}</span>
      </p>
    </BlockCard>
  );
}

export function SummaryBlockView({
  title,
  points,
  nextStep,
}: {
  title: string;
  points: string[];
  nextStep: string;
}) {
  return (
    <BlockCard eyebrow="Recap" title={title || "What you should take away"}>
      <ul className="flex flex-col gap-2.5">
        {points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm leading-relaxed">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-2 rounded-2xl border border-primary/35 bg-primary/5 px-3.5 py-3 text-xs leading-relaxed">
        <Send className="mt-px size-3.5 shrink-0 text-primary" aria-hidden />
        <span>{nextStep}</span>
      </p>
    </BlockCard>
  );
}

export function ReflectionBlockView({
  title,
  prompts,
  helper,
  value,
  onChange,
}: {
  title: string;
  prompts: string[];
  helper: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const ready = value.trim().length >= 3;

  return (
    <BlockCard eyebrow="Reflection" title={title || "Think it through"}>
      <div className="flex flex-col gap-3">
        {prompts.map((prompt) => (
          <p key={prompt} className="text-sm font-medium leading-relaxed">
            {prompt}
          </p>
        ))}
        <Textarea
          value={value}
          rows={4}
          disabled={submitted}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write a sentence or two…"
          className="text-sm"
        />
        <p className="text-[11px] leading-relaxed text-muted-foreground">{helper}</p>
        {!submitted ? (
          <Button
            type="button"
            variant="secondary"
            className="h-11 font-semibold"
            disabled={!ready}
            onClick={() => setSubmitted(true)}
          >
            Save reflection
          </Button>
        ) : (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-success">
            <Check className="size-3.5" aria-hidden />
            Noted. Nothing was uploaded — this stays in your browser.
          </p>
        )}
      </div>
    </BlockCard>
  );
}
