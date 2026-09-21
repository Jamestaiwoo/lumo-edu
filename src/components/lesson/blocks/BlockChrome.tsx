import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb, Target } from "lucide-react";
import type { Callout, KeyTerm, Tone } from "@/content/course/types";

export function BlockCard({
  title,
  eyebrow,
  children,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-border/60 bg-card p-5 ${className}`}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="text-lg font-bold leading-snug">{title}</h2> : null}
      <div className={title || eyebrow ? "mt-3" : ""}>{children}</div>
    </section>
  );
}

const CALLOUT_STYLES: Record<Tone, { wrap: string; icon: typeof Info }> = {
  info: { wrap: "border-primary/35 bg-primary/5 text-foreground", icon: Info },
  tip: { wrap: "border-success/35 bg-success/5 text-foreground", icon: Lightbulb },
  warning: { wrap: "border-warning/45 bg-warning/10 text-foreground", icon: AlertTriangle },
  pitfall: { wrap: "border-destructive/40 bg-destructive/10 text-foreground", icon: Target },
};

export function CalloutBox({ callout }: { callout: Callout }) {
  const style = CALLOUT_STYLES[callout.tone];
  const Icon = style.icon;
  return (
    <div className={`rounded-2xl border px-3.5 py-3 ${style.wrap}`}>
      <p className="flex items-center gap-1.5 text-xs font-bold">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        {callout.title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{callout.body}</p>
    </div>
  );
}

export function KeyTermList({ terms }: { terms: KeyTerm[] }) {
  return (
    <dl className="flex flex-col gap-2 rounded-2xl border border-border/50 bg-secondary/40 p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Terms to keep
      </p>
      {terms.map((term) => (
        <div key={term.term} className="text-xs leading-relaxed">
          <dt className="inline font-bold">{term.term}</dt>
          <dd className="inline text-muted-foreground"> — {term.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TeachingParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-foreground/90">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function WhyItMatters({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-primary bg-secondary/40 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
        Why it matters
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
