import { describe, expect, it } from "vitest";
import { COURSE_LESSONS, getCourseLesson, lessonAssessmentItems } from "..";
import type { Candle, OrderBookSnapshot } from "../types";

const lessons = COURSE_LESSONS;
const lesson = (id: string) => getCourseLesson(id)!;

function candleGroupsOf(lessonId: string): Candle[][] {
  const out: Candle[][] = [];
  for (const block of lesson(lessonId).blocks) {
    if (block.kind === "visual" && block.visual.type === "candles") out.push(block.visual.candles);
    if (block.kind === "interactive" && block.interaction.type === "chart-read")
      out.push(block.interaction.candles);
  }
  return out;
}

function booksOf(lessonId: string): OrderBookSnapshot[] {
  const out: OrderBookSnapshot[] = [];
  for (const block of lesson(lessonId).blocks) {
    if (block.kind === "visual" && block.visual.type === "order-book") out.push(block.visual.book);
    if (
      block.kind === "interactive" &&
      block.interaction.type === "order-book-decision" &&
      block.interaction.book
    )
      out.push(block.interaction.book);
  }
  return out;
}

describe("cross-block numeric consistency", () => {
  it("keeps every candle internally valid and continuous with its neighbours", () => {
    for (const current of lessons) {
      for (const candles of candleGroupsOf(current.id)) {
        candles.forEach((candle, index) => {
          const label = `${current.id} candle ${index + 1}`;
          expect(candle.high, label).toBeGreaterThanOrEqual(Math.max(candle.open, candle.close));
          expect(candle.low, label).toBeLessThanOrEqual(Math.min(candle.open, candle.close));
          expect(candle.low, label).toBeGreaterThan(0);
          if (index > 0) {
            expect(candle.open, `${label} opens at the previous close`).toBeCloseTo(
              candles[index - 1]!.close,
              2,
            );
          }
        });
      }
    }
  });

  it("keeps every order book sorted with a positive spread", () => {
    for (const current of lessons) {
      for (const book of booksOf(current.id)) {
        for (let i = 1; i < book.asks.length; i++) {
          expect(book.asks[i]!.price, `${current.id} asks ascending`).toBeGreaterThan(
            book.asks[i - 1]!.price,
          );
        }
        for (let i = 1; i < book.bids.length; i++) {
          expect(book.bids[i]!.price, `${current.id} bids descending`).toBeLessThan(
            book.bids[i - 1]!.price,
          );
        }
        expect(book.asks[0]!.price, `${current.id} best bid below best ask`).toBeGreaterThan(
          book.bids[0]!.price,
        );
      }
    }
  });

  it("keeps every two-sided quote a real spread", () => {
    for (const current of lessons) {
      for (const block of current.blocks) {
        if (block.kind === "visual" && block.visual.type === "spread") {
          expect(block.visual.ask, `${current.id} spread visual`).toBeGreaterThan(block.visual.bid);
        }
        if (block.kind === "interactive" && block.interaction.type === "spread-explorer") {
          for (const level of block.interaction.levels) {
            expect(level.ask, `${current.id} level ${level.name}`).toBeGreaterThan(level.bid);
          }
        }
        if (block.kind === "interactive" && block.interaction.type === "order-type-simulator") {
          expect(block.interaction.ask, `${current.id} simulator ask`).toBeGreaterThan(
            block.interaction.bid,
          );
        }
      }
    }
  });

  it("keeps every price-path marker inside the data it points at", () => {
    for (const current of lessons) {
      for (const block of current.blocks) {
        if (block.kind === "visual" && block.visual.type === "price-path") {
          for (const marker of block.visual.markers ?? []) {
            expect(marker.index, `${current.id} marker "${marker.label}"`).toBeGreaterThanOrEqual(
              0,
            );
            expect(marker.index, `${current.id} marker "${marker.label}"`).toBeLessThan(
              block.visual.points.length,
            );
          }
        }
      }
    }
  });

  it("matches tf-l2's worked average to the book it walks", () => {
    const book = booksOf("tf-l2")[0]!;
    // The example buys 100 shares at each of the three ask levels.
    const fills = [book.asks[0]!, book.asks[1]!, book.asks[2]!];
    const total = fills.reduce((sum, level) => sum + level.price * 100, 0);
    const shares = 300;
    expect(total / shares).toBeCloseTo(20.17, 2);
  });

  it("matches tf-l4's graded round-trip question to its own quote", () => {
    const visual = lesson("tf-l4").blocks.find(
      (block) => block.kind === "visual" && block.visual.type === "spread",
    );
    expect(visual && visual.kind === "visual").toBe(true);
    if (visual && visual.kind === "visual" && visual.visual.type === "spread") {
      const perShare = visual.visual.ask - visual.visual.bid;
      const item = lessonAssessmentItems(lesson("tf-l4")).find(
        (entry) => entry.question.id === "tf-l4-q2",
      )!;
      expect(item.question.type === "numeric" ? item.question.answer : null).toBeCloseTo(
        perShare * 1000,
        6,
      );
    }
  });

  it("makes tf-l7's sizing mission reachable from its example", () => {
    const budget = 10_000 * 0.01;
    const shares = budget / (50 - 48);
    expect(shares).toBe(50);
    const mission = lesson("tf-l7").blocks.find(
      (block) => block.kind === "interactive" && block.interaction.type === "position-size-builder",
    );
    expect(mission && mission.kind === "interactive").toBe(true);
    if (
      mission &&
      mission.kind === "interactive" &&
      mission.interaction.type === "position-size-builder"
    ) {
      expect(mission.interaction.mission.minShares).toBeLessThanOrEqual(shares);
      expect(mission.interaction.mission.maxShares).toBeGreaterThanOrEqual(shares);
    }
  });

  it("matches tf-l10's capstone arithmetic to its plan", () => {
    const example = lesson("tf-l10").blocks.find((block) => block.kind === "example")!;
    if (example.kind === "example") {
      expect(example.example.setup).toMatch(/20\.15 bid/);
    }
    // Entry 20.20, stop 19.68, $100 ceiling → ~192 shares, as the plan step says.
    expect(Math.round(100 / (20.2 - 19.68))).toBe(192);
    const capstone = lessonAssessmentItems(lesson("tf-l10")).find(
      (entry) => entry.question.id === "tf-l10-q2",
    )!;
    expect(capstone.question.type === "numeric" ? capstone.question.answer : null).toBe(50);
  });
});
