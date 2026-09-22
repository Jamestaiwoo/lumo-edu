import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, ChartNoAxesCombined, BookOpenCheck, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { WeakDrill } from "@/components/practice/WeakDrill";
import { PaperTrading } from "@/components/practice/PaperTrading";
import { RiskCalculator } from "@/components/practice/RiskCalculator";
import { JournalTab } from "@/components/practice/JournalTab";

export const Route = createFileRoute("/_authenticated/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Lumo" },
      {
        name: "description",
        content: "Drill your weak topics, size positions with the risk calculator, run simulated paper trades and journal them.",
      },
      { property: "og:title", content: "Practice — Lumo" },
      {
        property: "og:description",
        content: "Drill weak topics, size positions, run simulated paper trades and keep a trade journal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

const TABS = [
  { id: "drill", label: "Drill" },
  { id: "paper", label: "Paper" },
  { id: "risk", label: "Risk" },
  { id: "journal", label: "Journal" },
] as const;

function PracticePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("drill");

  const TAB_META = {
    drill: { icon: Brain, eyebrow: "Targeted practice", title: "Sharpen weak spots", description: "Turn mistakes into reps with focused drills." },
    paper: { icon: ChartNoAxesCombined, eyebrow: "Market lab", title: "Trade the market", description: "Test ideas with simulated money and market data." },
    risk: { icon: ShieldCheck, eyebrow: "Risk tools", title: "Size the trade", description: "Calculate position size before you take the risk." },
    journal: { icon: BookOpenCheck, eyebrow: "Review", title: "Study your decisions", description: "Record trades, review outcomes, and spot patterns." },
  } as const;

  const active = TAB_META[tab];
  const ActiveIcon = active.icon;

  return (
    <AppShell title="Practice" subtitle="Train your decision-making">
      <div className="flex flex-col gap-4">
        <section className="overflow-hidden rounded-3xl border border-border/60 bg-card">
          <div className="bg-gradient-to-br from-primary/15 via-card to-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">{active.eyebrow}</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">{active.title}</h2>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">{active.description}</p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ActiveIcon className="size-5" aria-hidden />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 border-t border-border/60">
            {TABS.map((t) => {
              const Icon = TAB_META[t.id].icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-label={t.label}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 border-r border-border/60 px-1 text-[10px] font-bold transition last:border-r-0 ${tab === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/60"}`}
                >
                  <Icon className="size-4" aria-hidden />
                  {t.label}
                </button>
              );
            })}
          </div>
        </section>

        {tab === "drill" && <WeakDrill />}
        {tab === "paper" && <PaperTrading />}
        {tab === "risk" && <RiskCalculator />}
        {tab === "journal" && <JournalTab />}

        <Disclaimer />
      </div>
    </AppShell>
  );
}
