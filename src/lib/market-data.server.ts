import { INSTRUMENTS, type AssetClass } from "./market";

export type MarketAssetClass = AssetClass;

export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number | null;
};

export type MarketProvider = "twelve-data" | "coingecko" | "alpha-vantage" | "simulated";

export type MarketSnapshot = {
  symbol: string;
  price: number;
  candles: Candle[];
  live: boolean;
  provider: MarketProvider;
  message?: string;
};

export type MarketInterval = "1min" | "5min" | "15min" | "1h" | "4h" | "1day" | "1week";

const TWELVE_DATA_BASE = "https://api.twelvedata.com";
const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const ALPHA_VANTAGE_BASE = "https://www.alphavantage.co/query";

const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const cache = new Map<string, { expiresAt: number; value: MarketSnapshot }>();
const CACHE_TTL_MS = 45_000;
const FALLBACK_CACHE_TTL_MS = 10_000;

const COINGECKO_IDS: Record<string, string> = {
  "BTC/USD": "bitcoin",
  "ETH/USD": "ethereum",
  "SOL/USD": "solana",
  "BNB/USD": "binancecoin",
  "XRP/USD": "ripple",
};

function normaliseSymbol(symbol: string) {
  return symbol.trim().toUpperCase();
}

function getInstrument(symbol: string) {
  const instrument = INSTRUMENTS.find((item) => item.symbol === symbol);
  if (!instrument) throw new Error("Unsupported instrument.");
  return instrument;
}

export function getAssetClass(symbol: string): MarketAssetClass {
  return getInstrument(normaliseSymbol(symbol)).assetClass;
}

function parseNumber(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function providerInterval(interval: MarketInterval): string {
  if (interval === "4h") return "1h";
  return interval;
}

function aggregateCandles(candles: Candle[], bucketHours: number): Candle[] {
  const buckets = new Map<number, Candle>();
  const bucketMs = bucketHours * 60 * 60 * 1000;

  for (const candle of candles) {
    const timestamp = Date.parse(candle.time.replace(" ", "T") + (candle.time.includes("T") ? "" : "Z"));
    if (!Number.isFinite(timestamp)) continue;

    const key = Math.floor(timestamp / bucketMs) * bucketMs;
    const current = buckets.get(key);

    if (!current) {
      buckets.set(key, { ...candle, time: new Date(key).toISOString() });
      continue;
    }

    current.high = Math.max(current.high, candle.high);
    current.low = Math.min(current.low, candle.low);
    current.close = candle.close;
    current.volume =
      current.volume == null || candle.volume == null ? null : current.volume + candle.volume;
  }

  return [...buckets.values()].sort((a, b) => a.time.localeCompare(b.time));
}

function parseTwelveDataSeries(data: Record<string, unknown>): Candle[] {
  const values = Array.isArray(data.values) ? data.values : [];

  return values
    .map((value) => {
      if (!value || typeof value !== "object") return null;
      const row = value as Record<string, unknown>;
      const open = parseNumber(row.open);
      const high = parseNumber(row.high);
      const low = parseNumber(row.low);
      const close = parseNumber(row.close);

      if (open == null || high == null || low == null || close == null) return null;

      return {
        time: String(row.datetime ?? ""),
        open,
        high,
        low,
        close,
        volume: parseNumber(row.volume),
      };
    })
    .filter((candle): candle is Candle => candle !== null)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function parseCoinGeckoMarketChart(data: Record<string, unknown>): Candle[] {
  const prices = Array.isArray(data.prices) ? data.prices : [];
  const volumes = Array.isArray(data.total_volumes) ? data.total_volumes : [];
  const volumeByTime = new Map<number, number>();

  for (const item of volumes) {
    if (!Array.isArray(item) || item.length < 2) continue;
    const timestamp = parseNumber(item[0]);
    const volume = parseNumber(item[1]);
    if (timestamp != null && volume != null) volumeByTime.set(timestamp, volume);
  }

  const parsed = prices
    .map((item, index) => {
      if (!Array.isArray(item) || item.length < 2) return null;
      const timestamp = parseNumber(item[0]);
      const close = parseNumber(item[1]);
      if (timestamp == null || close == null) return null;

      const previous = index > 0 && Array.isArray(prices[index - 1])
        ? parseNumber(prices[index - 1][1])
        : close;
      const next = index + 1 < prices.length && Array.isArray(prices[index + 1])
        ? parseNumber(prices[index + 1][1])
        : close;

      const open = previous ?? close;
      const high = Math.max(open, close, next ?? close);
      const low = Math.min(open, close, next ?? close);

      return {
        time: new Date(timestamp).toISOString(),
        open,
        high,
        low,
        close,
        volume: volumeByTime.get(timestamp) ?? null,
      };
    })
    .filter((candle): candle is Candle => candle !== null);

  return parsed.sort((a, b) => a.time.localeCompare(b.time));
}

function parseAlphaVantageSeries(data: Record<string, unknown>): Candle[] {
  const seriesKey = Object.keys(data).find((key) => key.toLowerCase().includes("time series"));
  if (!seriesKey || !data[seriesKey] || typeof data[seriesKey] !== "object") return [];

  const raw = data[seriesKey] as Record<string, unknown>;
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
    .filter((candle): candle is Candle => candle !== null)
    .sort((a, b) => a.time.localeCompare(b.time));
}

const SYNTHETIC_BASE_PRICES: Record<string, number> = {
  AAPL: 240,
  MSFT: 510,
  NVDA: 180,
  TSLA: 350,
  AMZN: 230,
  GOOGL: 250,
  "EUR/USD": 1.17,
  "GBP/USD": 1.35,
  "USD/JPY": 148,
  "USD/CHF": 0.80,
  "BTC/USD": 110_000,
  "ETH/USD": 4_000,
  "SOL/USD": 200,
  "BNB/USD": 900,
  "XRP/USD": 3,
};

function makeSyntheticSeries(symbol: string, points = 80): Candle[] {
  const base = SYNTHETIC_BASE_PRICES[symbol] ?? 100;
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

async function fetchJson(url: URL, headers?: HeadersInit): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: { Accept: "application/json", ...headers },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Provider returned HTTP ${response.status}.`);

  const data = (await response.json()) as Record<string, unknown>;

  if (typeof data.error === "string") throw new Error(data.error);
  if (typeof data.message === "string" && data.success === false) throw new Error(data.message);
  if (typeof data["Error Message"] === "string") throw new Error(data["Error Message"]);
  if (typeof data["Note"] === "string") throw new Error("Provider rate limit reached.");

  return data;
}

async function fetchTwelveData(symbol: string, interval: MarketInterval): Promise<Candle[]> {
  if (!TWELVE_DATA_API_KEY) throw new Error("Twelve Data API key is not configured.");

  const url = new URL(`${TWELVE_DATA_BASE}/time_series`);
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", providerInterval(interval));
  url.searchParams.set("outputsize", "120");
  url.searchParams.set("timezone", "UTC");
  url.searchParams.set("apikey", TWELVE_DATA_API_KEY);

  const data = await fetchJson(url);
  let candles = parseTwelveDataSeries(data);
  if (interval === "4h") candles = aggregateCandles(candles, 4);
  return candles;
}

async function fetchCoinGecko(symbol: string, interval: MarketInterval): Promise<Candle[]> {
  const coinId = COINGECKO_IDS[symbol];
  if (!coinId) throw new Error("CoinGecko mapping is missing for this crypto instrument.");
  if (!COINGECKO_API_KEY) throw new Error("CoinGecko API key is not configured.");

  const days = interval === "1week" ? "30" : interval === "1day" ? "30" : interval === "4h" ? "7" : "1";
  const url = new URL(`${COINGECKO_BASE}/coins/${coinId}/market_chart`);
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("days", days);
  url.searchParams.set("precision", "full");

  const data = await fetchJson(url, { "x-cg-demo-api-key": COINGECKO_API_KEY });
  let candles = parseCoinGeckoMarketChart(data);

  if (interval === "4h") candles = aggregateCandles(candles, 4);
  if (interval === "1day") candles = aggregateCandles(candles, 24);
  if (interval === "1week") candles = aggregateCandles(candles, 24 * 7);

  return candles;
}

async function fetchAlphaVantage(symbol: string, assetClass: MarketAssetClass, interval: MarketInterval): Promise<Candle[]> {
  if (!ALPHA_VANTAGE_API_KEY) throw new Error("Alpha Vantage API key is not configured.");

  const url = new URL(ALPHA_VANTAGE_BASE);
  const effectiveInterval = providerInterval(interval);

  if (assetClass === "stock") {
    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      url.searchParams.set("function", effectiveInterval === "1week" ? "TIME_SERIES_WEEKLY" : "TIME_SERIES_DAILY");
      url.searchParams.set("symbol", symbol);
      url.searchParams.set("outputsize", "compact");
    } else {
      url.searchParams.set("function", "TIME_SERIES_INTRADAY");
      url.searchParams.set("symbol", symbol);
      url.searchParams.set("interval", effectiveInterval);
      url.searchParams.set("outputsize", "compact");
    }
  } else if (assetClass === "forex") {
    const [from, to] = symbol.split("/");
    if (!from || !to) throw new Error("Invalid forex symbol.");

    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      url.searchParams.set("function", effectiveInterval === "1week" ? "FX_WEEKLY" : "FX_DAILY");
    } else {
      url.searchParams.set("function", "FX_INTRADAY");
      url.searchParams.set("interval", effectiveInterval);
    }

    url.searchParams.set("from_symbol", from);
    url.searchParams.set("to_symbol", to);
    url.searchParams.set("outputsize", "compact");
  } else {
    const [crypto, market] = symbol.split("/");
    if (!crypto || !market) throw new Error("Invalid crypto symbol.");

    if (effectiveInterval === "1day" || effectiveInterval === "1week") {
      url.searchParams.set("function", effectiveInterval === "1week" ? "DIGITAL_CURRENCY_WEEKLY" : "DIGITAL_CURRENCY_DAILY");
      url.searchParams.set("symbol", crypto);
      url.searchParams.set("market", market);
    } else {
      url.searchParams.set("function", "CRYPTO_INTRADAY");
      url.searchParams.set("symbol", crypto);
      url.searchParams.set("market", market);
      url.searchParams.set("interval", effectiveInterval);
      url.searchParams.set("outputsize", "compact");
    }
  }

  url.searchParams.set("apikey", ALPHA_VANTAGE_API_KEY);
  let candles = parseAlphaVantageSeries(await fetchJson(url));
  if (interval === "4h") candles = aggregateCandles(candles, 4);
  return candles;
}

type ProviderFetcher = {
  provider: Exclude<MarketProvider, "simulated">;
  fetch: () => Promise<Candle[]>;
};

function providerOrder(
  symbol: string,
  assetClass: MarketAssetClass,
  interval: MarketInterval,
): ProviderFetcher[] {
  if (assetClass === "crypto") {
    return [
      { provider: "coingecko", fetch: () => fetchCoinGecko(symbol, interval) },
      { provider: "twelve-data", fetch: () => fetchTwelveData(symbol, interval) },
      { provider: "alpha-vantage", fetch: () => fetchAlphaVantage(symbol, assetClass, interval) },
    ];
  }

  return [
    { provider: "twelve-data", fetch: () => fetchTwelveData(symbol, interval) },
    { provider: "alpha-vantage", fetch: () => fetchAlphaVantage(symbol, assetClass, interval) },
  ];
}

async function fetchWithFallback(
  symbol: string,
  assetClass: MarketAssetClass,
  interval: MarketInterval,
): Promise<{ provider: Exclude<MarketProvider, "simulated">; candles: Candle[] } | null> {
  for (const candidate of providerOrder(symbol, assetClass, interval)) {
    try {
      const candles = await candidate.fetch();
      if (candles.length > 0) return { provider: candidate.provider, candles };
    } catch (error) {
      console.warn(`[Market] ${candidate.provider} failed:`, error);
    }
  }

  return null;
}

export async function getMarketSnapshot(
  symbolInput: string,
  interval: MarketInterval = "15min",
): Promise<MarketSnapshot> {
  const symbol = normaliseSymbol(symbolInput);
  const instrument = getInstrument(symbol);
  const cacheKey = `${symbol}:${interval}`;
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const result = await fetchWithFallback(symbol, instrument.assetClass, interval);

  if (result) {
    const value: MarketSnapshot = {
      symbol,
      price: result.candles[result.candles.length - 1]!.close,
      candles: result.candles.slice(-100),
      live: true,
      provider: result.provider,
    };

    cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, value });
    return value;
  }

  const synthetic = makeSyntheticSeries(symbol);
  const value: MarketSnapshot = {
    symbol,
    price: synthetic[synthetic.length - 1]!.close,
    candles: synthetic,
    live: false,
    provider: "simulated",
    message: "Live market data is unavailable. Showing clearly labelled simulated data.",
  };

  cache.set(cacheKey, { expiresAt: Date.now() + FALLBACK_CACHE_TTL_MS, value });
  return value;
}

export async function getLiveMarketPrice(symbol: string): Promise<number> {
  const snapshot = await getMarketSnapshot(symbol, "1min");
  return snapshot.live ? snapshot.price : 0;
}

export const SUPPORTED_INSTRUMENTS = INSTRUMENTS;
