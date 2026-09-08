import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddJournal, useJournal, useTrades } from "@/lib/api";

const MOODS = ["calm", "confident", "anxious", "impatient", "frustrated"];

export function JournalTab() {
  const { data: entries = [] } = useJournal();
  const { data: trades = [] } = useTrades();
  const add = useAddJournal();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [lesson, setLesson] = useState("");
  const [mood, setMood] = useState("calm");
  const [tradeId, setTradeId] = useState<string>("");

  async function save() {
    if (!title.trim()) {
      toast.error("Give the entry a title.");
      return;
    }
    await add.mutateAsync({
      title: title.trim(),
      notes: notes.trim(),
      lesson_learned: lesson.trim(),
      mood,
      trade_id: tradeId || null,
    });
    setTitle("");
    setNotes("");
    setLesson("");
    setTradeId("");
    toast.success("Journal entry saved");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <p className="text-sm font-bold">New entry</p>
        <div className="mt-3 flex flex-col gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chased AURA breakout" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">What happened?</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Setup, plan, execution…" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">What will you do differently?</Label>
            <Textarea value={lesson} onChange={(e) => setLesson(e.target.value)} rows={2} placeholder="One concrete change" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">How did you feel?</Label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                    mood === m ? "border-primary bg-primary/10 text-primary" : "border-border"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          {trades.length > 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Link a practice trade (optional)</Label>
              <select
                value={tradeId}
                onChange={(e) => setTradeId(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">None</option>
                {trades.slice(0, 20).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.symbol} {t.side} @ {Number(t.entry_price).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button className="h-11 font-bold" onClick={save} disabled={add.isPending}>
            {add.isPending ? "Saving…" : "Save entry"}
          </Button>
        </div>
      </div>

      <section>
        <h3 className="mb-2 text-sm font-bold">Your journal</h3>
        {entries.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
            Nothing yet. Writing down the decision is how you separate a good process from a good outcome.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {entries.map((e) => (
              <li key={e.id} className="rounded-2xl border border-border/60 bg-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold">{e.title}</p>
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold capitalize">
                    {e.mood}
                  </span>
                </div>
                {e.notes && <p className="mt-1.5 whitespace-pre-wrap text-xs text-muted-foreground">{e.notes}</p>}
                {e.lesson_learned && (
                  <p className="mt-2 rounded-xl bg-primary/10 px-3 py-2 text-xs text-primary">→ {e.lesson_learned}</p>
                )}
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {new Date(e.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
