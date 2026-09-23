import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Clock3, MessageSquarePlus, Search, Send, Trash2, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  askCoach,
  deleteCoachConversation,
  getCoachConversation,
  listCoachConversations,
} from "@/lib/coach.functions";
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
type HistoryItem = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

const STARTERS = [
  "Why does position sizing matter more than picking winners?",
  "Explain risk/reward like I'm brand new.",
  "What is the difference between a market and a limit order?",
  "How do I build a trading journal habit?",
];

const WELCOME: Msg = {
  role: "assistant",
  content: "Hi! I'm your Lumo coach. I explain concepts — I never tell you what to buy or sell. What would you like to understand today?",
};

function CoachPage() {
  const list = useServerFn(listCoachConversations);
  const load = useServerFn(getCoachConversation);
  const remove = useServerFn(deleteCoachConversation);
  const call = useServerFn(askCoach);
  const bottom = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [error, setError] = useState<unknown>(null);

  async function refreshHistory() {
    try {
      const items = await list({ data: undefined });
      setHistory(items);
    } catch (err) {
      setError(err);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    void refreshHistory();
  }, []);

  const filteredHistory = history.filter((chat) =>
    chat.title.toLowerCase().includes(historySearch.trim().toLowerCase()),
  );

  function startNewChat() {
    setHistoryOpen(false);
    setActiveChatId(null);
    setMessages([WELCOME]);
    setInput("");
    setError(null);
  }

  async function openChat(chat: HistoryItem) {
    setBusy(true);
    setError(null);
    try {
      const result = await load({ data: { conversationId: chat.id } });
      setActiveChatId(result.conversation.id);
      setMessages(
        result.messages.map((message) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: message.content,
        })),
      );
      setHistoryOpen(false);
      setInput("");
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  async function deleteChat(id: string) {
    try {
      await remove({ data: { conversationId: id } });
      setHistory((items) => items.filter((chat) => chat.id !== id));
      if (id === activeChatId) startNewChat();
    } catch (err) {
      setError(err);
    }
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
      const res = await call({
        data: {
          conversationId: activeChatId,
          messages: next,
        },
      });
      const complete = [...next, { role: "assistant" as const, content: res.reply }];
      setActiveChatId(res.conversationId);
      setMessages(complete);
      await refreshHistory();
    } catch (err) {
      setError(err);
      setMessages(next);
    } finally {
      setBusy(false);
      setTimeout(() => bottom.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <AppShell title="AI Coach" subtitle="Explains concepts, never gives advice">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/70 p-3">
          <div>
            <p className="text-sm font-semibold">Lumo Coach</p>
            <p className="text-xs text-muted-foreground">Your progress-aware trading learning coach.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setHistoryOpen(true)}>
              <Clock3 className="mr-2 size-4" aria-hidden />
              History{history.length > 0 ? ` (${history.length})` : ""}
            </Button>
            <Button type="button" size="sm" onClick={startNewChat}>
              <MessageSquarePlus className="mr-2 size-4" aria-hidden />
              New chat
            </Button>
          </div>
        </div>

        {historyOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-3 backdrop-blur-sm sm:items-center">
            <div className="flex max-h-[78vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/60 p-4">
                <div>
                  <p className="font-semibold">Chat history</p>
                  <p className="text-xs text-muted-foreground">Saved to your Lumo account.</p>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setHistoryOpen(false)} aria-label="Close history">
                  <X className="size-4" />
                </Button>
              </div>
              <div className="border-b border-border/60 p-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search conversations…"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="overflow-y-auto p-2">
                {historyLoading ? (
                  <div className="px-4 py-10 text-center text-sm text-muted-foreground">Loading conversations…</div>
                ) : filteredHistory.length === 0 ? (
                  <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {history.length ? "No conversations match your search." : "Your conversations will appear here."}
                  </div>
                ) : (
                  filteredHistory.map((chat) => (
                    <div key={chat.id} className="flex items-center gap-2 rounded-xl p-2 hover:bg-muted/50">
                      <button type="button" onClick={() => void openChat(chat)} className="min-w-0 flex-1 rounded-lg px-2 py-2 text-left">
                        <p className="truncate text-sm font-medium">{chat.title}</p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock3 className="size-3" aria-hidden />
                          {new Date(chat.updated_at).toLocaleString()}
                        </p>
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => void deleteChat(chat.id)}
                        aria-label={`Delete ${chat.title}`}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={`${activeChatId ?? "new"}-${i}`}
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
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => void send(starter)}
                className="rounded-xl border border-border px-3.5 py-2.5 text-left text-xs text-muted-foreground"
              >
                {starter}
              </button>
            ))}
          </div>
        )}

        <ErrorBanner error={error} />

        <form
          className="sticky bottom-20 flex gap-2 rounded-2xl border border-border/60 bg-card p-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
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
