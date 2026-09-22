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
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-md px-4 pb-3 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div
                aria-label="Lumo"
                className="text-[1.75rem] font-black leading-none tracking-[-0.08em] text-primary"
                style={{ fontFamily: '"Gramatika", "Space Grotesk", sans-serif' }}
              >
                Lumo
              </div>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                Learn trading. One decision at a time.
              </p>
            </div>

            {showStats && profile ? (
              <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
                <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
                  <Flame className="size-3.5" aria-hidden />
                  {profile.streak_count}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">
                  <Zap className="size-3.5" aria-hidden />
                  {profile.xp}
                </span>
                <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-semibold">
                  Lv {lv.level}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                {title}
              </p>
              {subtitle ? (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-4">{children}</main>
      <BottomNav />
    </div>
  );
}
