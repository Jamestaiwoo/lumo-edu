import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askCoach } from "@/lib/coach.functions";
import { useProfile, useTopicStats } from "@/lib/api";
import { TOPIC_LABELS } from "@/content/curriculum";
import { ErrorBanner } from "@/components/state/StateViews";

export const Route = createFileRoute("/_authenticated/coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — Lumo" },
      { name: "description", content: "Ask the Lumo coach to explain trading concepts in plain language. Education only." },
      { property: "og:title", content: "AI Coach — Lumo" },
      { property: "og:description", content: "Ask the Lumo coach to explain trading concepts in plain language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CoachPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Why does position sizing matter more than picking winners?",
  "Explain risk/reward like I'm brand new.",
  "What is the difference between a market and a limit order?",
  "How do I build a trading journal habit?",
];

function CoachPage() {
  const { data: profile } = useProfile();
  const { data: topics = [] } = useTopicStats();
  const call = useServerFn(askCoach);
  const bottom = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Lumo coach. I explain concepts — I never tell you what to buy or sell. What would you like to understand today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const weak = topics
        .filter((t) => t.accuracy < 0.75)
        .slice(0, 3)
        .map((t) => TOPIC_LABELS[t.topic] ?? t.topic)
        .join(", ");
      const context = `Experience: ${profile?.experience_level ?? "beginner"}. Goal: ${profile?.goal ?? "learn_basics"}.${
        weak ? ` Struggling with: ${weak}.` : ""
      }`;
      const res = await call({ data: { messages: next, context } });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch (err) {
      setError(err);
      setMessages([
        ...next,
        { role: "assistant", content: "I couldn't reach the coach just now. Try again in a moment." },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => bottom.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <AppShell title="AI Coach" subtitle="Explains concepts, never gives advice">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-primary text-primary-foreground"
                  : "self-start border border-border/60 bg-card"
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="self-start rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground">
              Thinking…
            </div>
          )}
          <div ref={bottom} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-col gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-xl border border-border px-3.5 py-2.5 text-left text-xs text-muted-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <ErrorBanner error={error} />

        <form
          className="sticky bottom-20 flex gap-2 rounded-2xl border border-border/60 bg-card p-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a concept…"
            className="h-11 border-0 bg-transparent focus-visible:ring-0"
          />
          <Button type="submit" size="icon" className="size-11 shrink-0" disabled={busy || !input.trim()}>
            <Send className="size-4" aria-hidden />
            <span className="sr-only">Send</span>
          </Button>
        </form>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
