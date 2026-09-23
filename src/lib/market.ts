export type AssetClass = "stock" | "forex" | "crypto";

export type Instrument = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
};

export const INSTRUMENTS: Instrument[] = [
  { symbol: "AAPL", name: "Apple", assetClass: "stock" },
  { symbol: "MSFT", name: "Microsoft", assetClass: "stock" },
  { symbol: "NVDA", name: "NVIDIA", assetClass: "stock" },
  { symbol: "TSLA", name: "Tesla", assetClass: "stock" },
  { symbol: "AMZN", name: "Amazon", assetClass: "stock" },
  { symbol: "GOOGL", name: "Alphabet", assetClass: "stock" },
  { symbol: "EUR/USD", name: "Euro / US Dollar", assetClass: "forex" },
  { symbol: "GBP/USD", name: "Pound / US Dollar", assetClass: "forex" },
  { symbol: "USD/JPY", name: "US Dollar / Yen", assetClass: "forex" },
  { symbol: "USD/CHF", name: "US Dollar / Swiss Franc", assetClass: "forex" },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", assetClass: "crypto" },
  { symbol: "ETH/USD", name: "Ethereum / US Dollar", assetClass: "crypto" },
  { symbol: "SOL/USD", name: "Solana / US Dollar", assetClass: "crypto" },
  { symbol: "BNB/USD", name: "BNB / US Dollar", assetClass: "crypto" },
  { symbol: "XRP/USD", name: "XRP / US Dollar", assetClass: "crypto" },
];

export function quoteToUsdMultiplier(symbol: string, price: number) {
  if (!Number.isFinite(price) || price <= 0) return 1;
  const instrument = INSTRUMENTS.find((item) => item.symbol === symbol);
  if (!instrument || instrument.assetClass !== "forex") return 1;

  const [, quote] = symbol.split("/");
  return quote === "USD" ? 1 : 1 / price;
}

export function riskPerUnitInAccountCurrency(symbol: string, price: number, stopLoss: number) {
  return Math.abs(price - stopLoss) * quoteToUsdMultiplier(symbol, price);
}

export function pnlFor(side: string, qty: number, entry: number, current: number, symbol?: string) {
  const dir = side === "short" ? -1 : 1;
  const multiplier = symbol ? quoteToUsdMultiplier(symbol, current) : 1;
  return +((current - entry) * qty * dir * multiplier).toFixed(2);
}

export function getBidAsk(price: number, _symbol?: string) {
  const spread = +(price * 0.0005).toFixed(6);
  return {
    bid: +(price - spread / 2).toFixed(6),
    ask: +(price + spread / 2).toFixed(6),
    spread,
  };
}
