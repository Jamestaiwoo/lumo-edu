export type Instrument = { symbol: string; name: string; base: number; vol: number };

export const INSTRUMENTS: Instrument[] = [
  { symbol: "AURA", name: "Aura Systems", base: 48.5, vol: 1 },
  { symbol: "NVEX", name: "Novex Energy", base: 132.4, vol: 1.4 },
  { symbol: "HELM", name: "Helm Logistics", base: 21.8, vol: 0.7 },
  { symbol: "ORBT", name: "Orbit Media", base: 76.2, vol: 1.1 },
  { symbol: "TIDE", name: "Tidewater Bank", base: 9.6, vol: 0.5 },
  { symbol: "SOLA", name: "Solara Health", base: 189.9, vol: 1.8 },
];

function seedOf(symbol: string) {
  let s = 0;
  for (let i = 0; i < symbol.length; i++) s = (s * 31 + symbol.charCodeAt(i)) % 997;
  return s;
}

/** Deterministic simulated price. No real market data is used. */
export function priceAt(symbol: string, t: number = Date.now()): number {
  const inst = INSTRUMENTS.find((i) => i.symbol === symbol);
  if (!inst) return 0;
  const s = seedOf(symbol);
  const m = t / 60000;
  const wave =
    Math.sin(m / 37 + s) * 0.021 +
    Math.sin(m / 11 + s * 1.7) * 0.011 +
    Math.sin(m / 3.3 + s * 0.4) * 0.005 +
    Math.sin(m / 0.9 + s * 2.2) * 0.002;
  return +(inst.base * (1 + wave * inst.vol)).toFixed(2);
}

export function seriesFor(symbol: string, points = 60, stepMs = 60000) {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => {
    const t = now - (points - 1 - i) * stepMs;
    return { t, price: priceAt(symbol, t) };
  });
}

export function pnlFor(side: string, qty: number, entry: number, current: number) {
  const dir = side === "short" ? -1 : 1;
  return +((current - entry) * qty * dir).toFixed(2);
}
