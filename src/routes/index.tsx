import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, LineChart, ShieldCheck, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumo — Learn trading. One decision at a time." },
      {
        name: "description",
        content:
          "Bite-sized trading lessons, streaks, an AI study coach and a $10,000 simulated paper account. Educational only.",
      },
      { property: "og:title", content: "Lumo — Learn trading. One decision at a time." },
      {
        property: "og:description",
        content:
          "Bite-sized trading lessons, streaks, an AI study coach and a $10,000 simulated paper account. Educational only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-md flex-col gap-8 px-5 py-12">
        <div
          aria-label="Lumo"
          className="text-4xl font-black tracking-[-0.08em] text-primary"
          style={{ fontFamily: '"Gramatika", "Space Grotesk", sans-serif' }}
        >
          Lumo
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-[1.05]">
            Learn trading.
            <br />
            <span className="text-primary">One decision at a time.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Short interactive lessons, instant feedback, daily streaks and a simulated $10,000 paper
            account so you can practise decisions without risking a cent.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            { icon: Zap, title: "5-minute lessons", body: "Three worlds of interactive questions with instant explanations." },
            { icon: Flame, title: "Streaks & XP", body: "Level up by showing up. Weak topics come back until they click." },
            { icon: LineChart, title: "Paper trading", body: "Simulated prices, stop losses and a position-size calculator." },
            { icon: ShieldCheck, title: "Risk first", body: "Every lesson starts from protecting the account, not chasing wins." },
          ].map((f) => (
            <div key={f.title} className="surface flex gap-3 rounded-2xl border border-border/60 p-4">
              <f.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to={signedIn ? "/home" : "/auth"}
            className="glow-primary inline-flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            {signedIn ? "Continue learning" : "Start learning free"}
          </Link>
          {!signedIn && (
            <Link
              to="/auth"
              search={{ mode: "signin" }}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border text-sm font-semibold"
            >
              I already have an account
            </Link>
          )}
        </div>

        <Disclaimer />
      </div>
    </div>
  );
}
