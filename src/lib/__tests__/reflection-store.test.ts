import { describe, expect, it } from "vitest";
import {
  clearReflections,
  loadReflections,
  resolveStorage,
  saveReflections,
  type MinimalStorage,
} from "../reflection-store";

/** Deterministic in-memory storage that also records write calls. */
function fakeStorage(): MinimalStorage & { writes: number } {
  const map = new Map<string, string>();
  let writes = 0;
  return {
    get writes() {
      return writes;
    },
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      writes += 1;
      void map.set(key, value);
    },
    removeItem: (key) => void map.delete(key),
  };
}

describe("reflection store", () => {
  it("round-trips reflections per lesson", () => {
    const storage = fakeStorage();
    saveReflections("tf-l1", { r1: "why spreads exist", r2: "liquidity matters" }, storage);
    expect(loadReflections("tf-l1", storage)).toEqual({
      r1: "why spreads exist",
      r2: "liquidity matters",
    });
  });

  it("isolates lessons from each other", () => {
    const storage = fakeStorage();
    saveReflections("tf-l1", { r1: "lesson one" }, storage);
    saveReflections("tf-l2", { r1: "lesson two" }, storage);
    expect(loadReflections("tf-l1", storage)).toEqual({ r1: "lesson one" });
    expect(loadReflections("tf-l2", storage)).toEqual({ r1: "lesson two" });
  });

  it("overwrites with the latest map", () => {
    const storage = fakeStorage();
    saveReflections("tf-l3", { r1: "first" }, storage);
    saveReflections("tf-l3", { r1: "second" }, storage);
    expect(loadReflections("tf-l3", storage)).toEqual({ r1: "second" });
  });

  it("returns empty for a lesson never saved", () => {
    expect(loadReflections("tf-none", fakeStorage())).toEqual({});
  });

  it("falls back to session-only memory when storage throws", () => {
    const throwing: MinimalStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
      removeItem: () => undefined,
    };
    const resolved = resolveStorage(throwing);
    expect(resolved.persistent).toBe(false);
    // Save/load still work within the session via the fallback.
    saveReflections("tf-l4", { r1: "kept in memory" }, throwing);
    expect(loadReflections("tf-l4", throwing)).toEqual({ r1: "kept in memory" });
  });

  it("tolerates corrupt JSON without throwing", () => {
    const storage = fakeStorage();
    storage.setItem("lumo.reflections.tf-l5", "{not json");
    expect(loadReflections("tf-l5", storage)).toEqual({});
  });

  it("tolerates non-object JSON payloads", () => {
    const storage = fakeStorage();
    storage.setItem("lumo.reflections.tf-l6", "[1,2,3]");
    storage.setItem("lumo.reflections.tf-l7", "42");
    expect(loadReflections("tf-l6", storage)).toEqual({});
    expect(loadReflections("tf-l7", storage)).toEqual({});
  });

  it("coerces non-string values instead of crashing", () => {
    const storage = fakeStorage();
    storage.setItem("lumo.reflections.tf-l8", '{"r1": 5}');
    expect(loadReflections("tf-l8", storage)).toEqual({ r1: "5" });
  });

  it("clearReflections removes the lesson entry", () => {
    const storage = fakeStorage();
    saveReflections("tf-l9", { r1: "x" }, storage);
    clearReflections("tf-l9", storage);
    expect(loadReflections("tf-l9", storage)).toEqual({});
  });

  it("never writes when persistence is unavailable", () => {
    const storage = fakeStorage();
    storage.setItem = () => {
      throw new Error("blocked");
    };
    expect(() => saveReflections("tf-l10", { r1: "x" }, storage)).not.toThrow();
  });
});
