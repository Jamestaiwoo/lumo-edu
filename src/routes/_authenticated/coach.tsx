import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Clock3, MessageSquarePlus, Send, Trash2 } from "lucide-react";
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
type Chat = { id: string; title: string; messages: Msg[]; updatedAt: string };

const STORAGE_KEY = "lumo-ai-coach-history";

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
  const [history, setHistory] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

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

  useEffect(() => {
    if (!profile?.id) return;
    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEY}:${profile.id}`);
      if (raw) setHistory(JSON.parse(raw) as Chat[]);
    } catch {
      // History is optional and should never block the coach.
    } finally {
      setHistoryLoaded(true);
    }
  }, [profile?.id]);

  useEffect(() => {
    if (!profile?.id || !historyLoaded) return;
    try {
      window.localStorage.setItem(`${STORAGE_KEY}:${profile.id}`, JSON.stringify(history.slice(0, 30)));
    } catch {
      // Keep the live chat usable if storage is unavailable.
    }
  }, [history, historyLoaded, profile?.id]);

  function startNewChat() {
    setActiveChatId(null);
    setMessages([{ role: "assistant", content: "Hi! I explain concepts — I never tell you what to buy or sell. What would you like to understand today?" }]);
    setInput("");
    setError(null);
  }

  function openChat(chat: Chat) {
    setActiveChatId(chat.id);
    setMessages(chat.messages);
    setInput("");
    setError(null);
  }

  function deleteChat(id: string) {
    setHistory((items) => items.filter((chat) => chat.id !== id));
    if (id === activeChatId) startNewChat();
  }

  function saveChat(nextMessages: Msg[]) {
    const firstUser = nextMessages.find((message) => message.role === "user");
    if (!firstUser) return;
    const id = activeChatId ?? crypto.randomUUID();
    const chat: Chat = {
      id,
      title: firstUser.content.slice(0, 48) + (firstUser.content.length > 48 ? "…" : ""),
      messages: nextMessages,
      updatedAt: new Date().toISOString(),
    };
    setActiveChatId(id);
    setHistory((items) => [chat, ...items.filter((item) => item.id !== id)].slice(0, 30));
  }

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
      const complete = [...next, { role: "assistant" as const, content: res.reply }];
      setMessages(complete);
      saveChat(complete);
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Coach conversations</p>
            <p className="text-xs text-muted-foreground">Recent chats saved on this device.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={startNewChat}>
            <MessageSquarePlus className="mr-2 size-4" aria-hidden />
            New chat
          </Button>
        </div>
        {history.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {history.map((chat) => (
              <div key={chat.id} className="group flex min-w-[190px] max-w-[230px] shrink-0 items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2">
                <button type="button" onClick={() => openChat(chat)} className="min-w-0 flex-1 text-left">
                  <p className="truncate text-xs font-medium">{chat.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground"><Clock3 className="size-3" aria-hidden />{new Date(chat.updatedAt).toLocaleDateString()}</p>
                </button>
                <button type="button" onClick={() => deleteChat(chat.id)} className="rounded-md p-1.5 text-muted-foreground hover:text-destructive" aria-label="Delete chat">
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}
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
