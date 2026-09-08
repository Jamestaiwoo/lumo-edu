export const XP_PER_LEVEL = 120;

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const intoLevel = xp % XP_PER_LEVEL;
  return { level, intoLevel, needed: XP_PER_LEVEL, pct: (intoLevel / XP_PER_LEVEL) * 100 };
}

export function todayISO(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function nextStreak(lastActive: string | null, current: number) {
  const today = todayISO();
  if (lastActive === today) return { streak: Math.max(current, 1), changed: false };
  const yesterday = todayISO(new Date(Date.now() - 86400000));
  if (lastActive === yesterday) return { streak: current + 1, changed: true };
  return { streak: 1, changed: true };
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}
