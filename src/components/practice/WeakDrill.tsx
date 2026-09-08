import { useMemo, useState } from "react";
import { Check, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALL_LESSONS, TOPIC_LABELS, type Question } from "@/content/curriculum";
import { useTopicStats } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function evaluate(q: Question, choice: number | null, text: string) {
  if (q.type === "mcq") return choice === q.answer;
  if (q.type === "truefalse") return (choice === 0) === q.answer;
  const val = Number(text.replace(/[^0-9.\-]/g, ""));
  return !Number.isNaN(val) && Math.abs(val - q.answer) <= (q.tolerance ?? 0.01);
}

export function WeakDrill() {
  const { data: topics = [], refetch } = useTopicStats();
  const [seed, setSeed] = useState(0);
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const weakTopics = topics.filter((t) => t.accuracy < 0.8).map((t) => t.topic);

  const set = useMemo(() => {
    const pool = ALL_LESSONS.flatMap((l) => l.questions);
    const weighted = weakTopics.length ? pool.filter((q) => weakTopics.includes(q.topic)) : pool;
    const source = weighted.length >= 5 ? weighted : pool;
    return [...source].sort(() => Math.random() - 0.5).slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, topics.length]);

  const q = set[i];
  if (!q) return null;
  const correct = evaluate(q, choice, text);

  async function next() {
    if (!checked) {
      setChecked(true);
      if (correct) setScore((s) => s + 1);
      const { data: u } = await supabase.auth.getUser();
      if (u.user) {
        await supabase.from("question_attempts").insert({
          user_id: u.user.id,
          lesson_id: "practice",
          question_id: q!.id,
          topic: q!.topic,
          correct,
        });
      }
      return;
    }
    setChecked(false);
    setChoice(null);
    setText("");
    if (i + 1 < set.length) setI(i + 1);
    else {
      setDone(true);
      refetch();
    }
  }

  function restart() {
    setSeed((s) => s + 1);
    setI(0);
    setScore(0);
    setDone(false);
    setChecked(false);
    setChoice(null);
    setText("");
    toast.success("New drill ready");
  }

  if (done) {
    return (
      <div className="surface rounded-2xl border border-border/60 p-6 text-center">
        <p className="text-sm text-muted-foreground">Drill finished</p>
        <p className="mt-2 text-4xl font-bold text-primary">
          {score}/{set.length}
        </p>
        <Button className="mt-5 h-11 w-full font-semibold" onClick={restart}>
          <RefreshCw className="mr-2 size-4" aria-hidden /> New drill
        </Button>
      </div>
    );
  }

  const answered = q.type === "numeric" ? text.trim() !== "" : choice !== null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{TOPIC_LABELS[q.topic] ?? q.topic}</span>
        <span>
          {i + 1}/{set.length}
        </span>
      </div>

      <p className="text-base font-bold leading-snug">{q.prompt}</p>

      <div className="flex flex-col gap-2">
        {q.type === "mcq" &&
          q.options.map((opt, idx) => (
            <Opt key={opt} label={opt} state={state(checked, choice, idx, q.answer)} onClick={() => !checked && setChoice(idx)} />
          ))}
        {q.type === "truefalse" &&
          ["True", "False"].map((opt, idx) => (
            <Opt
              key={opt}
              label={opt}
              state={state(checked, choice, idx, q.answer ? 0 : 1)}
              onClick={() => !checked && setChoice(idx)}
            />
          ))}
        {q.type === "numeric" && (
          <Input
            inputMode="decimal"
            value={text}
            disabled={checked}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your answer"
            className="h-12"
          />
        )}
      </div>

      {checked && (
        <div
          className={`rounded-2xl border p-3.5 ${
            correct ? "border-success/50 bg-success/10" : "border-destructive/50 bg-destructive/10"
          }`}
        >
          <p className={`flex items-center gap-2 text-sm font-bold ${correct ? "text-success" : "text-destructive"}`}>
            {correct ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
            {correct ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1 text-xs leading-relaxed">{q.explain}</p>
        </div>
      )}

      <Button className="h-12 font-bold" disabled={!answered} onClick={next}>
        {checked ? "Continue" : "Check answer"}
      </Button>
    </div>
  );
}

function state(checked: boolean, choice: number | null, index: number, answer: number) {
  if (!checked) return choice === index ? "selected" : "idle";
  if (index === answer) return "correct";
  if (choice === index) return "wrong";
  return "idle";
}

function Opt({
  label,
  state: s,
  onClick,
}: {
  label: string;
  state: string;
  onClick: () => void;
}) {
  const cls =
    s === "correct"
      ? "border-success bg-success/15"
      : s === "wrong"
        ? "border-destructive bg-destructive/15"
        : s === "selected"
          ? "border-primary bg-primary/10"
          : "border-border bg-card";
  return (
    <button type="button" onClick={onClick} className={`rounded-2xl border px-4 py-3 text-left text-sm ${cls}`}>
      {label}
    </button>
  );
}
