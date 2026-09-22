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

  return (
    <AppShell title="Practice" subtitle="Reps without real money">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-secondary p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-xl py-2 text-xs font-semibold transition ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "drill" && <WeakDrill />}
        {tab === "paper" && <PaperTrading />}
        {tab === "risk" && <RiskCalculator />}
        {tab === "journal" && <JournalTab />}

        <Disclaimer />
      </div>
    </AppShell>
  );
}
