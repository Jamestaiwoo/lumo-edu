import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flame, Play, Target, Trophy, Wallet, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { useAchievements, useProfile, useProgress, useTopicStats } from "@/lib/api";
import { ACHIEVEMENTS, ALL_LESSONS, TOPIC_LABELS, WORLDS } from "@/content/curriculum";
import { levelFromXp, money, todayISO } from "@/lib/game";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBanner, ErrorState, LoadingState } from "@/components/state/StateViews";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Lumo" },
      { name: "description", content: "Your streak, XP, daily goal and next trading lesson at a glance." },
      { property: "og:title", content: "Your dashboard — Lumo" },
      { property: "og:description", content: "Your streak, XP, daily goal and next trading lesson at a glance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function useTodayXp() {
  return useQuery({
    queryKey: ["today-xp"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return 0;
      const { data } = await supabase
        .from("question_attempts")
        .select("correct")
        .eq("user_id", u.user.id)
        .gte("created_at", `${todayISO()}T00:00:00.000Z`);
      return ((data ?? []) as { correct: boolean }[]).filter((r) => r.correct).length * 5;
    },
  });
}

function HomePage() {
  const navigate = useNavigate();
  const profileQuery = useProfile();
  const profile = profileQuery.data;
  const progressQuery = useProgress();
  const progress = progressQuery.data ?? [];
  const achievementsQuery = useAchievements();
  const earned = achievementsQuery.data ?? [];
  const { data: topics = [] } = useTopicStats();
  const { data: todayXp = 0 } = useTodayXp();

  useEffect(() => {
    if (profile && !profile.onboarded) navigate({ to: "/onboarding", replace: true });
  }, [profile, navigate]);

  if (profileQuery.isError) {
    return (
      <AppShell title="Home">
        <ErrorState
          error={profileQuery.error}
          title="We couldn't load your dashboard"
          onRetry={() => profileQuery.refetch()}
        />
      </AppShell>
    );
  }

  if (profileQuery.isPending || !profile) {
    return (
      <AppShell title="Home">
        <LoadingState label="Loading your dashboard…" rows={4} />
      </AppShell>
    );
  }

  const completed = new Set(progress.filter((p) => p.completed).map((p) => p.lesson_id));
  const nextLesson = ALL_LESSONS.find((l) => !completed.has(l.id)) ?? ALL_LESSONS[0];
  const world = WORLDS.find((w) => w.lessons.some((l) => l.id === nextLesson?.id));
  const lv = levelFromXp(profile.xp);
  const goalPct = Math.min(100, (todayXp / Math.max(profile.daily_goal_xp, 1)) * 100);
  const weakest = topics.filter((t) => t.total >= 2 && t.accuracy < 0.75).slice(0, 3);

  return (
    <AppShell title={`Hi, ${profile.display_name}`} subtitle="Learn trading. One decision at a time.">
      <div className="flex flex-col gap-4">
        <section className="surface glow-primary rounded-3xl border border-primary/25 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Today's goal</p>
              <p className="mt-1 text-2xl font-bold">
                {todayXp}
                <span className="text-base font-medium text-muted-foreground"> / {profile.daily_goal_xp} XP</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-bold text-accent">
              <Flame className="size-4" aria-hidden />
              {profile.streak_count} day{profile.streak_count === 1 ? "" : "s"}
            </div>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${goalPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Level {lv.level} · {lv.intoLevel}/{lv.needed} XP to level {lv.level + 1}
          </p>
        </section>

        {nextLesson && (
          <Link
            to="/learn/$lessonId"
            params={{ lessonId: nextLesson.id }}
            className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition active:scale-[0.99]"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Play className="size-5 fill-current" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                {world?.title ?? "Next up"}
              </span>
              <span className="block truncate text-sm font-bold">{nextLesson.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{nextLesson.blurb}</span>
            </span>
          </Link>
        )}

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Target className="size-4 text-primary" aria-hidden />}
            label="Lessons done"
            value={`${completed.size}/${ALL_LESSONS.length}`}
          />
          <StatCard
            icon={<Trophy className="size-4 text-accent" aria-hidden />}
            label="Achievements"
            value={`${earned.length}/${ACHIEVEMENTS.length}`}
          />
          <StatCard
            icon={<Wallet className="size-4 text-success" aria-hidden />}
            label="Paper balance"
            value={money(Number(profile.cash_balance))}
          />
          <StatCard
            icon={<TrendingUp className="size-4 text-primary" aria-hidden />}
            label="Longest streak"
            value={`${profile.longest_streak} d`}
          />
        </div>

        {weakest.length > 0 && (
          <section className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="text-sm font-semibold">Worth another look</p>
            <ul className="mt-2 space-y-1.5">
              {weakest.map((t) => (
                <li key={t.topic} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{TOPIC_LABELS[t.topic] ?? t.topic}</span>
                  <span className="font-semibold text-accent">{Math.round(t.accuracy * 100)}%</span>
                </li>
              ))}
            </ul>
            <Link
              to="/practice"
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-secondary text-xs font-semibold"
            >
              Practise weak topics
            </Link>
          </section>
        )}

        <Disclaimer />
      </div>
    </AppShell>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1.5 text-lg font-bold">{value}</p>
    </div>
  );
}
