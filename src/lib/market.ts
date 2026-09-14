export type Instrument = { symbol: string; name: string };

// Real US stocks for paper trading
export const INSTRUMENTS: Instrument[] = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "GOOGL", name: "Google" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "META", name: "Meta" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "JPM", name: "JPMorgan Chase" },
];

// Price cache to avoid excessive API calls
// Key: symbol, Value: { price, timestamp }
const priceCache = new Map<string, { price: number; timestamp: number }>();
const CACHE_TTL_MS = 60000; // 1 minute cache

// Alpha Vantage API key from environment
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || process.env.VITE_ALPHA_VANTAGE_KEY;

if (!API_KEY) {
  console.warn("[Market] Alpha Vantage API key not found. Prices will be unavailable.");
}

/**
 * Fetch live price from Alpha Vantage API
 * Returns cached price if available and fresh
 */
export async function getLivePrice(symbol: string): Promise<number> {
  // Check cache first
  const cached = priceCache.get(symbol);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.price;
  }

  if (!API_KEY) {
    console.error(`[Market] Cannot fetch ${symbol}: Alpha Vantage API key missing`);
    return 0;
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    // Alpha Vantage response structure:
    // { "Global Quote": { "05. price": "150.25", ... } }
    const price = parseFloat(data["Global Quote"]?.["05. price"] ?? "0");

    if (price > 0) {
      // Cache the price
      priceCache.set(symbol, { price, timestamp: Date.now() });
      return price;
    } else {
      console.warn(`[Market] Invalid price received for ${symbol}:`, data);
      return 0;
    }
  } catch (error) {
    console.error(`[Market] Failed to fetch price for ${symbol}:`, error);
    return 0;
  }
}

/**
 * Get price with fallback to simulated price if API fails
 * Used in UI to always show something
 */
export async function getPriceWithFallback(symbol: string): Promise<number> {
  const livePrice = await getLivePrice(symbol);
  if (livePrice > 0) {
    return livePrice;
  }
  // Fallback to simulated price if API is down
  return getSimulatedPrice(symbol);
}

/**
 * Simulated price (used as fallback or for offline mode)
 * Deterministic based on symbol and time
 */
function getSimulatedPrice(symbol: string, t: number = Date.now()): number {
  function seedOf(sym: string) {
    let s = 0;
    for (let i = 0; i < sym.length; i++) s = (s * 31 + sym.charCodeAt(i)) % 997;
    return s;
  }

  const basePrice: Record<string, number> = {
    AAPL: 150,
    GOOGL: 140,
    MSFT: 380,
    TSLA: 250,
    NVDA: 875,
    AMD: 160,
    AMZN: 175,
    META: 320,
    NFLX: 450,
    JPM: 190,
  };

  const base = basePrice[symbol] || 100;
  const s = seedOf(symbol);
  const m = t / 60000;
  const wave =
    Math.sin(m / 37 + s) * 0.02 +
    Math.sin(m / 11 + s * 1.7) * 0.01 +
    Math.sin(m / 3.3 + s * 0.4) * 0.005 +
    Math.sin(m / 0.9 + s * 2.2) * 0.002;

  return +(base * (1 + wave)).toFixed(2);
}

/**
 * Get price at specific time (for historical data/charts)
 * Falls back to simulated prices
 */
export function priceAt(symbol: string, t: number = Date.now()): number {
  // For now, use simulated prices for historical data
  // In future, integrate with Alpha Vantage TIME_SERIES_DAILY
  return getSimulatedPrice(symbol, t);
}

/**
 * Get price series for charting (last N data points)
 */
export function seriesFor(symbol: string, points = 60, stepMs = 60000) {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => {
    const t = now - (points - 1 - i) * stepMs;
    return { t, price: priceAt(symbol, t) };
  });
}

/**
 * Calculate P&L for a trade
 */
export function pnlFor(side: string, qty: number, entry: number, current: number) {
  const dir = side === "short" ? -1 : 1;
  return +((current - entry) * qty * dir).toFixed(2);
}

/**
 * Simulate realistic bid/ask spread based on volatility
 */
export function getBidAsk(
  price: number,
  _symbol?: string
): { bid: number; ask: number; spread: number } {
  // Typical spread: 1-2 cents for liquid stocks
  const spread = +(price * 0.0005).toFixed(2); // 0.05% spread
  const bid = +(price - spread / 2).toFixed(2);
  const ask = +(price + spread / 2).toFixed(2);
  return { bid, ask, spread };
}

/**
 * Clear price cache (useful for testing or manual refresh)
 */
export function clearPriceCache() {
  priceCache.clear();
}
