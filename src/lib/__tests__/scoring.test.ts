import { describe, expect, it } from "vitest";
import {
  COMPLETION_BONUS_XP,
  MAX_OPEN_POSITIONS,
  advanceStreak,
  isoDate,
  lessonXp,
  levelForXp,
  pnlFor,
  validateClose,
  validateOpen,
} from "../scoring";

describe("levels and xp", () => {
  it("starts at level 1 and climbs every 120 xp", () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(119)).toBe(1);
    expect(levelForXp(120)).toBe(2);
    expect(levelForXp(600)).toBe(6);
  });

  it("pays the scored xp plus a completion bonus the first time", () => {
    expect(lessonXp({ lessonXp: 50, correct: 5, total: 5, alreadyRewarded: false })).toBe(50 + COMPLETION_BONUS_XP);
    expect(lessonXp({ lessonXp: 50, correct: 3, total: 5, alreadyRewarded: false })).toBe(30 + COMPLETION_BONUS_XP);
  });

  it("pays nothing for a repeat of the same lesson", () => {
    expect(lessonXp({ lessonXp: 50, correct: 5, total: 5, alreadyRewarded: true })).toBe(0);
  });
});

describe("streaks", () => {
  it("does not advance twice on the same day", () => {
    expect(advanceStreak("2026-09-11", 4, "2026-09-11")).toEqual({ streak: 4, changed: false });
  });

  it("increments after yesterday", () => {
    expect(advanceStreak("2026-09-10", 4, "2026-09-11")).toEqual({ streak: 5, changed: true });
  });

  it("resets after a gap and starts fresh for a new user", () => {
    expect(advanceStreak("2026-09-01", 9, "2026-09-11").streak).toBe(1);
    expect(advanceStreak(null, 0, "2026-09-11").streak).toBe(1);
  });

  it("formats dates as ISO days", () => {
    expect(isoDate(new Date("2026-09-11T22:15:00Z"))).toBe("2026-09-11");
  });
});

const base = {
  side: "long" as const,
  price: 100,
  stopLoss: 98,
  takeProfit: null,
  riskPct: 1,
  balance: 10000,
  openPositions: 0,
};

describe("opening a simulated trade", () => {
  it("recalculates quantity and risk from the balance", () => {
    const r = validateOpen(base);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.quantity).toBe(50); // 1% of 10000 = 100 risk / 2 per share
      expect(r.value.riskAmount).toBe(100);
    }
  });

  it("rejects a long stop above price and a short stop below price", () => {
    expect(validateOpen({ ...base, stopLoss: 102 }).ok).toBe(false);
    expect(validateOpen({ ...base, side: "short", stopLoss: 98 }).ok).toBe(false);
    expect(validateOpen({ ...base, side: "short", stopLoss: 102 }).ok).toBe(true);
  });

  it("rejects take profit on the wrong side", () => {
    expect(validateOpen({ ...base, takeProfit: 95 }).ok).toBe(false);
    expect(validateOpen({ ...base, takeProfit: 110 }).ok).toBe(true);
    expect(validateOpen({ ...base, side: "short", stopLoss: 102, takeProfit: 110 }).ok).toBe(false);
  });

  it("caps risk at 5% and requires a stop", () => {
    expect(validateOpen({ ...base, riskPct: 6 }).ok).toBe(false);
    expect(validateOpen({ ...base, riskPct: 5 }).ok).toBe(true);
    expect(validateOpen({ ...base, stopLoss: 0 }).ok).toBe(false);
  });

  it("refuses positions bigger than the buying power", () => {
    // 5% of 10000 = 500 risk, 0.1 per share → 5000 shares at 100 = 500k notional
    expect(validateOpen({ ...base, riskPct: 5, stopLoss: 99.9 }).ok).toBe(false);
  });

  it("enforces the open-position limit", () => {
    expect(validateOpen({ ...base, openPositions: MAX_OPEN_POSITIONS }).ok).toBe(false);
  });
});

describe("closing a simulated trade", () => {
  it("computes profit and loss by direction", () => {
    expect(pnlFor("long", 10, 100, 105)).toBe(50);
    expect(pnlFor("short", 10, 100, 105)).toBe(-50);
    expect(pnlFor("short", 10, 100, 95)).toBe(50);
  });

  it("refuses to close a position twice", () => {
    expect(validateClose({ exitPrice: 100, status: "closed" }).ok).toBe(false);
    expect(validateClose({ exitPrice: 100, status: "open" }).ok).toBe(true);
  });
});
