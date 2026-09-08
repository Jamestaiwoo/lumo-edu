import { DISCLAIMER } from "@/content/curriculum";
import { Info } from "lucide-react";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-[11px] leading-snug text-muted-foreground ${className}`}
    >
      <Info className="mt-[1px] size-3.5 shrink-0" aria-hidden />
      <span>{DISCLAIMER}</span>
    </p>
  );
}
