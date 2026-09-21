/**
 * Deterministic order-execution model used by the order type simulator.
 *
 * It is deliberately simple and rule-based rather than random, so the learner
 * can reason about every outcome and the behaviour is testable: the ticks are a
 * bid path supplied by the lesson content.
 */

export type SimOrderSide = "buy" | "sell";
export type SimOrderType = "market" | "limit";

export type SimOrderRequest = {
  type: SimOrderType;
  side: SimOrderSide;
  bid: number;
  ask: number;
  /** Required for limit orders. */
  limitPrice?: number | null;
  /** Bid ticks the learner steps the market through. */
  ticks: number[];
};

export type SimOrderOutcome = {
  status: "filled" | "unfilled";
  /** True when the order traded at the moment it was placed. */
  immediate: boolean;
  /** Index into `ticks` where it filled, or null for an immediate fill. */
  filledAtTick: number | null;
  fillPrice: number | null;
  headline: string;
  detail: string;
};

function price(value: number) {
  return value.toFixed(2);
}

export function simulateOrder(request: SimOrderRequest): SimOrderOutcome {
  const { type, side, bid, ask, ticks } = request;
  const limit = request.limitPrice ?? null;

  if (type === "market") {
    const fillPrice = side === "buy" ? ask : bid;
    return {
      status: "filled",
      immediate: true,
      filledAtTick: null,
      fillPrice,
      headline: `Filled immediately at ${price(fillPrice)}`,
      detail:
        side === "buy"
          ? `A market buy pays the ask (${price(ask)}). You are filled, but you had no say in the price.`
          : `A market sell receives the bid (${price(bid)}). You are filled, but at the price the market offered.`,
    };
  }

  if (limit === null) {
    return {
      status: "unfilled",
      immediate: false,
      filledAtTick: null,
      fillPrice: null,
      headline: "No limit price set",
      detail: "A limit order needs a price. Without one there is nothing to wait for.",
    };
  }

  if (side === "buy") {
    if (limit >= ask) {
      return {
        status: "filled",
        immediate: true,
        filledAtTick: null,
        fillPrice: ask,
        headline: `Filled immediately at ${price(ask)}`,
        detail: `Your limit of ${price(limit)} is at or above the ask, so it behaves like a market order — but the fill is capped at ${price(ask)}. That is price improvement, and it is the only guarantee your limit gives you.`,
      };
    }
    const index = ticks.findIndex((tick) => tick <= limit);
    if (index === -1) {
      return {
        status: "unfilled",
        immediate: false,
        filledAtTick: null,
        fillPrice: null,
        headline: `Nothing happened at ${price(limit)}`,
        detail: `The market never traded down to ${price(limit)} while you watched. The order would still be resting in the book, and the move may have left without you.`,
      };
    }
    const fillPrice = Math.min(limit, ticks[index] ?? limit);
    return {
      status: "filled",
      immediate: false,
      filledAtTick: index,
      fillPrice,
      headline: `Filled at ${price(fillPrice)} on tick ${index + 1}`,
      detail: `You got your price or better. Notice what happened next: a limit fill does not mean you bought well, only that your price was reached. If the market kept falling, your entry is now showing a loss.`,
    };
  }

  if (limit <= bid) {
    return {
      status: "filled",
      immediate: true,
      filledAtTick: null,
      fillPrice: bid,
      headline: `Filled immediately at ${price(bid)}`,
      detail: `A limit sell at or below the bid is aggressive: it trades at once against the best bid of ${price(bid)}, and the fill is never worse than your limit.`,
    };
  }
  const index = ticks.findIndex((tick) => tick >= limit);
  if (index === -1) {
    return {
      status: "unfilled",
      immediate: false,
      filledAtTick: null,
      fillPrice: null,
      headline: `Nothing happened at ${price(limit)}`,
      detail: `The market never traded up to ${price(limit)}. Your order stays unfilled until the price arrives, you cancel it, or it expires.`,
    };
  }
  const fillPrice = Math.max(limit, ticks[index] ?? limit);
  return {
    status: "filled",
    immediate: false,
    filledAtTick: index,
    fillPrice,
    headline: `Filled at ${price(fillPrice)} on tick ${index + 1}`,
    detail:
      "You received your price or better, but only because the market eventually came to you.",
  };
}
