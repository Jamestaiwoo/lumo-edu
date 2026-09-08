import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Disclaimer } from "@/components/Disclaimer";
import { useProfile, useUpdateProfile } from "@/lib/api";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your plan — TradeLingo" },
      { name: "description", content: "Tell TradeLingo your experience level and daily goal to personalise your learning path." },
      { property: "og:title", content: "Set up your plan — TradeLingo" },
      { property: "og:description", content: "Personalise your TradeLingo learning path in three quick steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Onboarding,
});

const LEVELS = [
  { id: "beginner", label: "Total beginner", body: "I've never placed a trade." },
  { id: "some", label: "Some experience", body: "I know the basics but lose the plot under pressure." },
  { id: "returning", label: "Coming back", body: "I've traded before and want to rebuild properly." },
];

const GOALS = [
  { id: "learn_basics", label: "Understand how markets work" },
  { id: "risk", label: "Get disciplined about risk" },
  { id: "charts", label: "Read charts with confidence" },
  { id: "practice", label: "Practise without real money" },
];

const DAILY = [15, 30, 60];

function Onboarding() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const update = useUpdateProfile();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("learn_basics");
  const [daily, setDaily] = useState(30);

  useEffect(() => {
    if (profile?.display_name && !name) setName(profile.display_name);
  }, [profile, name]);

  useEffect(() => {
    if (profile?.onboarded) navigate({ to: "/home", replace: true });
  }, [profile, navigate]);

  async function finish() {
    try {
      await update.mutateAsync({
        display_name: name.trim() || "Trader",
        experience_level: level,
        goal,
        daily_goal_xp: daily,
        onboarded: true,
      });
      toast.success("You're all set. Let's begin.");
      navigate({ to: "/home", replace: true });
    } catch {
      toast.error("Could not save your setup. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-5 py-10">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <Section title="What should we call you?" body="This is only used inside the app.">
            <Label htmlFor="dn" className="sr-only">
              Display name
            </Label>
            <Input id="dn" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" className="h-12" />
          </Section>
        )}

        {step === 1 && (
          <Section title="How much have you traded?" body="We'll pace the lessons accordingly.">
            <div className="grid gap-2">
              {LEVELS.map((l) => (
                <Choice key={l.id} selected={level === l.id} onClick={() => setLevel(l.id)} title={l.label} body={l.body} />
              ))}
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section title="What matters most right now?" body="Your path highlights this first.">
            <div className="grid gap-2">
              {GOALS.map((g) => (
                <Choice key={g.id} selected={goal === g.id} onClick={() => setGoal(g.id)} title={g.label} />
              ))}
            </div>
          </Section>
        )}

        {step === 3 && (
          <Section title="Pick a daily goal" body="Streaks are built on small, repeatable sessions.">
            <div className="grid grid-cols-3 gap-2">
              {DAILY.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDaily(d)}
                  className={`rounded-2xl border p-4 text-center transition ${
                    daily === d ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <span className="block text-xl font-bold">{d}</span>
                  <span className="text-[11px] text-muted-foreground">XP / day</span>
                </button>
              ))}
            </div>
          </Section>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <Disclaimer />
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" className="h-12 flex-1" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button
              className="h-12 flex-[2] font-bold"
              disabled={update.isPending}
              onClick={() => (step < 3 ? setStep(step + 1) : finish())}
            >
              {step < 3 ? "Continue" : update.isPending ? "Saving…" : "Start learning"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, body, children }: { title: string; body?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {body ? <p className="mt-1 text-sm text-muted-foreground">{body}</p> : null}
      </div>
      {children}
    </div>
  );
}

function Choice({
  selected,
  onClick,
  title,
  body,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  body?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
        selected ? "border-primary bg-primary/10" : "border-border"
      }`}
    >
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        {body ? <span className="block text-xs text-muted-foreground">{body}</span> : null}
      </span>
      {selected ? <Check className="size-4 shrink-0 text-primary" aria-hidden /> : null}
    </button>
  );
}
