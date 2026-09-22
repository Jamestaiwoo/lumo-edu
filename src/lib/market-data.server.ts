import "server-only";

export type MarketAssetClass = "stock" | "forex" | "crypto";

export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number | null;
};

export type MarketSnapshot = {
  symbol: string;
  price: number;
  candles: Candle[];
  live: boolean;
  provider: "alpha-vantage" | "simulated";
  message?: string;
};

export type MarketInterval = "5min" | "15min" | "1h" | "1day" | "1week";

const API_BASE = "https://www.alphavantage.co/query";
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const cache = new Map<string, { expiresAt: number; value: MarketSnapshot }>();
const CACHE_TTL_MS = 45_000;

const STOCK_SYMBOLS = new Set(["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA", "AMD", "AMZN", "META", "NFLX", "JPM"]);
const FOREX_SYMBOLS = new Set(["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD"]);
const CRYPTO_SYMBOLS = new Set(["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD", "XRP/USD"]);

export function getAssetClass(symbol: string): MarketAssetClass {
  if (FOREX_SYMBOLS.has(symbol)) return "forex";
  if (CRYPTO_SYMBOLS.has(symbol)) return "crypto";
  return "stock";
}

function normaliseSymbol(symbol: string) {
  return symbol.trim().toUpperCase();
}

function intervalForAsset(assetClass: MarketAssetClass, interval: MarketInterval) {
  if (assetClass === "stock") return interval;
  if (interval === "1day" || interval === "1week") return interval;
  return interval;
}

function parseNumber(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseSeries(raw: Record<string, unknown>): Candle[] {
  return Object.entries(raw)
    .map(([time, value]) => {
      if (!value || typeof value !== "object") return null;
      const row = value as Record<string, unknown>;
      const open = parseNumber(row["1. open"]);
      const high = parseNumber(row["2. high"]);
      const low = parseNumber(row["3. low"]);
      const close = parseNumber(row["4. close"]);
      if (open == null || high == null || low == null || close == null) return null;
      return {
        time,
        open,
        high,
        low,
        close,
        volume: parseNumber(row["5. volume"]),
      };
    })
    .filter((c): c is Candle => c !== null)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function makeSyntheticSeries(symbol: string, points = 80): Candle[] {
  const base = symbol === "AAPL" ? 150 : symbol === "BTC/USD" ? 60000 : symbol.includes("/") ? 1 : 100;
  let price = base;
  const now = Date.now();
  const seed = [...symbol].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.sin((index + seed) / 7) * 0.004 + Math.sin((index + seed) / 17) * 0.002;
    const open = price;
    const close = Math.max(0.00001, open * (1 + wave));
    const high = Math.max(open, close) * 1.0015;
    const low = Math.min(open, close) * 0.9985;
    price = close;
    return {
      time: new Date(now - (points - index) * 300_000).toISOString(),
      open: +open.toFixed(6),
      high: +high.toFixed(6),
      low: +low.toFixed(6),
      close: +close.toFixed(6),
      volume: null,
    };
  });
}

async function request(params: Record<string, string>) {
  if (!API_KEY) return null;
  const url = new URL(API_BASE);
  Object.entries({ ...params, apikey: API_KEY }).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
  if (!response.ok) throw new Error(`Market provider returned HTTP ${response.status}.`);
  const data = (await response.json()) as Record<string, unknown>;
  if (typeof data["Error Message"] === "string") throw new Error(data["Error Message"]);
  if (typeof data["Note"] === "string") throw new Error("Market-data provider rate limit reached.");
  return data;
}

async function fetchProviderCandles(symbol: string, assetClass: MarketAssetClass, interval: MarketInterval): Promise<Candle[]> {
  const effectiveInterval = intervalForAsset(assetClass, interval);
  let data: Record<string, unknown> | null;

  if (assetClass === "stock") {
    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      data = await request({
        function: effectiveInterval === "1week" ? "TIME_SERIES_WEEKLY" : "TIME_SERIES_DAILY",
        symbol,
        outputsize: "compact",
      });
    } else {
      data = await request({
        function: "TIME_SERIES_INTRADAY",
        symbol,
        interval: effectiveInterval,
        outputsize: "compact",
      });
    }
  } else if (assetClass === "forex") {
    const [from, to] = symbol.split("/");
    if (!from || !to) throw new Error("Invalid forex symbol.");
    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      data = await request({
        function: effectiveInterval === "1week" ? "FX_WEEKLY" : "FX_DAILY",
        from_symbol: from,
        to_symbol: to,
        outputsize: "compact",
      });
    } else {
      data = await request({
        function: "FX_INTRADAY",
        from_symbol: from,
        to_symbol: to,
        interval: effectiveInterval,
        outputsize: "compact",
      });
    }
  } else {
    const [from, market] = symbol.split("/");
    if (!from || !market) throw new Error("Invalid crypto symbol.");
    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      data = await request({
        function: effectiveInterval === "1week" ? "DIGITAL_CURRENCY_WEEKLY" : "DIGITAL_CURRENCY_DAILY",
        symbol: from,
        market,
      });
    } else {
      data = await request({
        function: "CRYPTO_INTRADAY",
        symbol: from,
        market,
        interval: effectiveInterval,
        outputsize: "compact",
      });
    }
  }

  if (!data) return [];
  const seriesKey = Object.keys(data).find((key) => key.toLowerCase().includes("time series"));
  return seriesKey && data[seriesKey] && typeof data[seriesKey] === "object"
    ? parseSeries(data[seriesKey] as Record<string, unknown>)
    : [];
}

export async function getMarketSnapshot(symbolInput: string, interval: MarketInterval = "15min"): Promise<MarketSnapshot> {
  const symbol = normaliseSymbol(symbolInput);
  const assetClass = getAssetClass(symbol);
  const cacheKey = `${symbol}:${interval}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  try {
    const candles = await fetchProviderCandles(symbol, assetClass, interval);
    if (candles.length > 0) {
      const value: MarketSnapshot = {
        symbol,
        price: candles[candles.length - 1]!.close,
        candles: candles.slice(-100),
        live: true,
        provider: "alpha-vantage",
      };
      cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, value });
      return value;
    }
  } catch (error) {
    console.warn("[Market] Provider request failed:", error);
  }

  const candles = makeSyntheticSeries(symbol);
  const value: MarketSnapshot = {
    symbol,
    price: candles[candles.length - 1]!.close,
    candles,
    live: false,
    provider: "simulated",
    message: API_KEY
      ? "Live market data is temporarily unavailable. Showing clearly labelled simulated data."
      : "Add ALPHA_VANTAGE_API_KEY to the server environment to enable market data.",
  };
  cache.set(cacheKey, { expiresAt: Date.now() + 10_000, value });
  return value;
}

export async function getLiveMarketPrice(symbol: string): Promise<number> {
  const snapshot = await getMarketSnapshot(symbol, "1min");
  return snapshot.live ? snapshot.price : 0;
}

export const SUPPORTED_INSTRUMENTS = [
  { symbol: "AAPL", name: "Apple", assetClass: "stock" as const },
  { symbol: "MSFT", name: "Microsoft", assetClass: "stock" as const },
  { symbol: "NVDA", name: "NVIDIA", assetClass: "stock" as const },
  { symbol: "TSLA", name: "Tesla", assetClass: "stock" as const },
  { symbol: "AMZN", name: "Amazon", assetClass: "stock" as const },
  { symbol: "GOOGL", name: "Alphabet", assetClass: "stock" as const },
  { symbol: "EUR/USD", name: "Euro / US Dollar", assetClass: "forex" as const },
  { symbol: "GBP/USD", name: "Pound / US Dollar", assetClass: "forex" as const },
  { symbol: "USD/JPY", name: "US Dollar / Yen", assetClass: "forex" as const },
  { symbol: "USD/CHF", name: "US Dollar / Swiss Franc", assetClass: "forex" as const },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", assetClass: "crypto" as const },
  { symbol: "ETH/USD", name: "Ethereum / US Dollar", assetClass: "crypto" as const },
  { symbol: "SOL/USD", name: "Solana / US Dollar", assetClass: "crypto" as const },
  { symbol: "BNB/USD", name: "BNB / US Dollar", assetClass: "crypto" as const },
  { symbol: "XRP/USD", name: "XRP / US Dollar", assetClass: "crypto" as const },
];
