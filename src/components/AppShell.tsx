import type { ReactNode } from "react";
import { Flame, Zap } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { useProfile } from "@/lib/api";
import { levelFromXp } from "@/lib/game";

export function AppShell({
  title,
  subtitle,
  children,
  showStats = true,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showStats?: boolean;
}) {
  const { data: profile } = useProfile();
  const lv = levelFromXp(profile?.xp ?? 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold">{title}</h1>
            {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          {showStats && profile ? (
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                <Flame className="size-3.5" aria-hidden />
                {profile.streak_count}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <Zap className="size-3.5" aria-hidden />
                {profile.xp}
              </span>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                Lv {lv.level}
              </span>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-4">{children}</main>
      <BottomNav />
    </div>
  );
}
