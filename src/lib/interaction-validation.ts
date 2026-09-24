/**
 * Input validation for the lesson interaction builders.
 *
 * Pure and rule-based like `order-simulation.ts`: the builders render state,
 * these functions decide whether that state can produce a meaningful result,
 * and every rejection explains WHY the input cannot work so a wrong input
 * still teaches something.
 */

export type Validation = {
  ok: boolean;
  /** Present only when !ok. Written for the learner, not the developer. */
  message: string | null;
};

const ok: Validation = { ok: true, message: null };

export type PositionSizeInput = {
  balance: number;
  entry: number;
  stop: number;
  riskPct: number;
};

export function validatePositionSizeInput(input: PositionSizeInput): Validation {
  const { balance, entry, stop, riskPct } = input;
  if (!Number.isFinite(balance) || balance <= 0) {
    return {
      ok: false,
      message: "Sizing starts from what you actually have. Enter a positive account balance.",
    };
  }
  if (!Number.isFinite(riskPct) || riskPct <= 0) {
    return {
      ok: false,
      message:
        "A 0% risk budget buys nothing — the whole point is choosing the small loss you would accept.",
    };
  }
  if (riskPct > 5) {
    return {
      ok: false,
      message:
        "More than 5% risk per trade is not sizing, it is gambling. Keep the risk percent small.",
    };
  }
  if (!Number.isFinite(entry) || !Number.isFinite(stop) || entry <= 0 || stop <= 0) {
    return {
      ok: false,
      message:
        "Enter positive prices for entry and stop — the stop distance is what sizes the position.",
    };
  }
  if (entry === stop) {
    return {
      ok: false,
      message:
        "Your stop equals your entry, so there is no risk-per-share to size against. A stop must sit away from the entry — that distance is what you are risking per share.",
    };
  }
  return ok;
}

export type TradePlanInput = {
  direction: "long" | "short";
  entry: number;
  stop: number;
  target: number;
  riskPct: number;
};

export function validateTradePlanInput(input: TradePlanInput): Validation {
  const { direction, entry, stop, target, riskPct } = input;
  const missing = [entry, stop, target, riskPct].some((value) => !Number.isFinite(value));
  if (missing) {
    return {
      ok: false,
      message:
        "Fill in entry, stop, target and risk as numbers — a plan you cannot read back is not a plan.",
    };
  }
  if (entry <= 0 || stop <= 0 || target <= 0) {
    return {
      ok: false,
      message: "Prices must be positive. A level at or below zero is not a trade, it is a typo.",
    };
  }
  if (direction === "long") {
    if (stop >= entry) {
      return {
        ok: false,
        message:
          "For a long, the stop sits below entry — it is the price that proves the idea wrong. At or above entry it would close the trade before it starts.",
      };
    }
    if (target <= entry) {
      return {
        ok: false,
        message:
          "For a long, the target sits above entry — that is where you would take profit. Below entry the plan wins you a loss.",
      };
    }
  } else {
    if (stop <= entry) {
      return {
        ok: false,
        message:
          "For a short, the stop sits above entry — it is the price that proves the idea wrong. At or below entry it would close the trade before it starts.",
      };
    }
    if (target >= entry) {
      return {
        ok: false,
        message:
          "For a short, the target sits below entry — that is where you would buy back cheaper. Above entry the plan wins you a loss.",
      };
    }
  }
  if (riskPct <= 0) {
    return {
      ok: false,
      message:
        "A plan with 0% risk has no position to plan. Pick the small percent you would accept losing.",
    };
  }
  if (riskPct > 5) {
    return {
      ok: false,
      message:
        "Keep risk between 0 and 5% — beyond that, a normal losing streak takes you out of the game.",
    };
  }
  return ok;
}
