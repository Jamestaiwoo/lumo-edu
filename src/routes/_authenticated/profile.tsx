import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Award, Flame, LogOut, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAchievements, usePaperAccount, useProfile, useProgress, useTopicStats, useUpdateProfile } from "@/lib/api";
import { ErrorBanner, ErrorState, LoadingState } from "@/components/state/StateViews";
import { ACHIEVEMENTS, ALL_LESSONS, TOPIC_LABELS } from "@/content/curriculum";
import { levelFromXp, money } from "@/lib/game";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Lumo" },
      { name: "description", content: "Your XP, level, streaks, achievements and topic accuracy in Lumo." },
      { property: "og:title", content: "Profile — Lumo" },
      { property: "og:description", content: "Your XP, level, streaks, achievements and topic accuracy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const profileQuery = useProfile();
  const profile = profileQuery.data;
  const { data: progress = [] } = useProgress();
  const achievementsQuery = useAchievements();
  const earned = achievementsQuery.data ?? [];
  const { data: topics = [] } = useTopicStats();
  const account = usePaperAccount();
  const update = useUpdateProfile();
  const [name, setName] = useState("");

  if (profileQuery.isError) {
    return (
      <AppShell title="Profile">
        <ErrorState
          error={profileQuery.error}
          title="We couldn't load your profile"
          onRetry={() => profileQuery.refetch()}
        />
      </AppShell>
    );
  }

  if (profileQuery.isPending || !profile) {
    return (
      <AppShell title="Profile">
        <LoadingState label="Loading your profile…" rows={4} />
      </AppShell>
    );
  }

  const lv = levelFromXp(profile.xp);
  const earnedCodes = new Set(earned.map((e) => e.code));
  const completed = progress.filter((p) => p.completed).length;

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function saveName() {
    if (!name.trim()) {
      toast.error("Enter a name first.");
      return;
    }
    await update.mutateAsync({ display_name: name.trim() });
    setName("");
    toast.success("Name updated");
  }

  return (
    <AppShell title="Profile" subtitle={profile.display_name}>
      <div className="flex flex-col gap-4">
        <section className="surface glow-primary rounded-3xl border border-primary/25 p-5">
          <p className="text-3xl font-bold">Level {lv.level}</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${lv.pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {profile.xp} XP total · {lv.needed - lv.intoLevel} XP to next level
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="Streak" value={`${profile.streak_count}d`} />
            <Mini label="Best" value={`${profile.longest_streak}d`} />
            <Mini label="Lessons" value={`${completed}/${ALL_LESSONS.length}`} />
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Award className="size-4 text-accent" aria-hidden /> Achievements
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {ACHIEVEMENTS.map((a) => {
              const has = earnedCodes.has(a.code);
              return (
                <li
                  key={a.code}
                  className={`rounded-xl border p-3 ${has ? "border-accent/50 bg-accent/10" : "border-border/50 opacity-60"}`}
                >
                  <p className="flex items-center gap-1.5 text-xs font-bold">
                    {has ? <Flame className="size-3.5 text-accent" aria-hidden /> : <Lock className="size-3.5" aria-hidden />}
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{a.description}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {topics.length > 0 && (
          <section className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="text-sm font-bold">Topic accuracy</p>
            <ul className="mt-3 space-y-2">
              {topics.map((t) => (
                <li key={t.topic}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{TOPIC_LABELS[t.topic] ?? t.topic}</span>
                    <span className="font-semibold">{Math.round(t.accuracy * 100)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${t.accuracy >= 0.8 ? "bg-success" : t.accuracy >= 0.5 ? "bg-warning" : "bg-destructive"}`}
                      style={{ width: `${t.accuracy * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <p className="text-sm font-bold">Account</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Simulated balance: <span className="font-semibold text-foreground">{money(Number(profile.cash_balance))}</span>
          </p>
          <div className="mt-3 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Change display name</Label>
            <div className="flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={profile.display_name} />
              <Button variant="secondary" onClick={saveName} disabled={update.isPending}>
                Save
              </Button>
            </div>
          </div>
          <Button variant="outline" className="mt-4 h-11 w-full" onClick={signOut}>
            <LogOut className="mr-2 size-4" aria-hidden /> Sign out
          </Button>
        </section>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/70 p-2.5">
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
