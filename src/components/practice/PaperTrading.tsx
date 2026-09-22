import { useMemo, useState } from "react";
import { Activity, BarChart3, Search, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState, ErrorBanner, ErrorState, LoadingState } from "@/components/state/StateViews";
import { INSTRUMENTS, pnlFor, type AssetClass } from "@/lib/market";
import { money } from "@/lib/game";
import { MAX_OPEN_POSITIONS } from "@/lib/scoring";
import {
  useCloseTrade,
  useLivePrices,
  useMarketChart,
  useOpenTrade,
  usePaperAccount,
  useTrades,
} from "@/lib/api";

type MarketInterval = "1min" | "5min" | "15min" | "1h" | "4h" | "1day" | "1week";
type Candle = { time: string; open: number; high: number; low: number; close: number; volume: number | null };

const TIMEFRAMES: { value: MarketInterval; label: string }[] = [
  { value: "1min", label: "1m" },
  { value: "5min", label: "5m" },
  { value: "15min", label: "15m" },
  { value: "1h", label: "1H" },
  { value: "4h", label: "4H" },
  { value: "1day", label: "1D" },
  { value: "1week", label: "1W" },
];

const ASSET_FILTERS: { value: "all" | AssetClass; label: string }[] = [
  { value: "all", label: "All" },
  { value: "stock", label: "Stocks" },
  { value: "forex", label: "Forex" },
  { value: "crypto", label: "Crypto" },
];

export function PaperTrading() {
  const account = usePaperAccount();
  const tradesQuery = useTrades();
  const open = useOpenTrade();
  const close = useCloseTrade();

  const [symbol, setSymbol] = useState(INSTRUMENTS[0]!.symbol);
  const [assetFilter, setAssetFilter] = useState<"all" | AssetClass>("all");
  const [search, setSearch] = useState("");
  const [interval, setInterval] = useState<MarketInterval>("15min");
  const [side, setSide] = useState<"long" | "short">("long");
  const [riskPct, setRiskPct] = useState("1");
  const [stop, setStop] = useState("");
  const [take, setTake] = useState("");
  const [showSma, setShowSma] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  const market = useMarketChart(symbol, interval);
  const trades = tradesQuery.data ?? [];
  const openTrades = trades.filter((trade) => trade.status === "open");
  const closedTrades = trades.filter((trade) => trade.status === "closed");
  const livePrices = useLivePrices(openTrades.map((trade) => trade.symbol));

  const filteredInstruments = useMemo(() => {
    const q = search.trim().toLowerCase();
    return INSTRUMENTS.filter((instrument) => {
      const matchesFilter = assetFilter === "all" || instrument.assetClass === assetFilter;
      const matchesSearch = !q || instrument.symbol.toLowerCase().includes(q) || instrument.name.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [assetFilter, search]);

  const candles = (market.data?.candles ?? []) as Candle[];
  const price = Number(market.data?.price ?? 0);
  const balance = Number(account.data?.current_balance ?? 0);
  const stopNum = Number(stop) || 0;
  const takeNum = Number(take) || 0;
  const riskAmount = (balance * (Number(riskPct) || 0)) / 100;
  const distanceToStop = stopNum > 0 ? Math.abs(price - stopNum) : 0;
  const qty = distanceToStop > 0 ? Math.floor(riskAmount / distanceToStop) : 0;
  const selectedInstrument = INSTRUMENTS.find((instrument) => instrument.symbol === symbol);

  const openPnl = openTrades.reduce((sum, trade) => {
    const quote = livePrices.data?.[trade.symbol];
    if (!quote?.live) return sum;
    return sum + pnlFor(trade.side, Number(trade.quantity), Number(trade.entry_price), Number(quote.price));
  }, 0);

  const realised = closedTrades.reduce((sum, trade) => sum + Number(trade.pnl ?? 0), 0);
  const wins = closedTrades.filter((trade) => Number(trade.pnl ?? 0) > 0).length;

  async function placeTrade() {
    if (!market.data?.live) {
      toast.error("Live market data is required before placing a paper trade.");
      return;
    }

    try {
      const res = await open.mutateAsync({
        symbol,
        side,
        riskPct: Number(riskPct),
        stopLoss: stopNum,
        takeProfit: takeNum || null,
      });
      setStop("");
      setTake("");
      toast.success(`Simulated ${res.side} ${res.quantity} ${res.symbol} @ ${res.entryPrice.toFixed(2)}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not place that trade.");
    }
  }

  const banner = (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`size-2 shrink-0 rounded-full ${market.data?.live ? "bg-success" : "bg-warning"}`} />
        <p className="truncate text-[11px] font-bold uppercase tracking-wide">
          {market.data?.live ? "Market data connected" : "Simulated market data"}
        </p>
      </div>
      <span className="shrink-0 text-[10px] text-muted-foreground">Paper only</span>
    </div>
  );

  if (account.isPending || tradesQuery.isPending) {
    return (
      <div className="flex flex-col gap-4">
        {banner}
        <LoadingState label="Loading your practice account…" rows={3} />
      </div>
    );
  }

  if (account.isError || tradesQuery.isError) {
    return (
      <div className="flex flex-col gap-4">
        {banner}
        <ErrorState
          error={account.error ?? tradesQuery.error}
          title="We couldn't load your practice account"
          onRetry={() => {
            account.refetch();
            tradesQuery.refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {banner}

      <section className="surface rounded-2xl border border-border/60 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Simulated cash</p>
            <p className="text-2xl font-bold tracking-tight">{money(balance)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Open P&amp;L</p>
            <p className={`text-lg font-bold ${openPnl >= 0 ? "text-success" : "text-destructive"}`}>
              {openPnl >= 0 ? "+" : ""}
              {money(openPnl)}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
          <Activity className="mt-0.5 size-3.5 shrink-0" />
          <span>Virtual money only. Market prices are used for learning and simulation, never real execution.</span>
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card p-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search markets…"
              className="h-10 pl-9"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {ASSET_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setAssetFilter(filter.value)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${assetFilter === filter.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filteredInstruments.map((instrument) => (
              <button
                key={instrument.symbol}
                type="button"
                onClick={() => setSymbol(instrument.symbol)}
                className={`shrink-0 rounded-xl border px-3 py-2 text-left ${symbol === instrument.symbol ? "border-primary bg-primary/10" : "border-border"}`}
              >
                <span className="block text-xs font-bold">{instrument.symbol}</span>
                <span className="block max-w-28 truncate text-[10px] text-muted-foreground">{instrument.name}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredInstruments.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No markets found" description="Try another symbol or asset class." />
          </div>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{selectedInstrument?.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">{symbol}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                    {selectedInstrument?.assetClass}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums">
                  {price > 0 ? price.toLocaleString(undefined, { maximumFractionDigits: price < 10 ? 5 : 2 }) : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">{market.data?.live ? "latest available" : "simulated"}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
                {TIMEFRAMES.map((frame) => (
                  <button
                    key={frame.value}
                    type="button"
                    onClick={() => setInterval(frame.value)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${interval === frame.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <IndicatorButton active={showSma} onClick={() => setShowSma((value) => !value)} label="SMA 20" />
                <IndicatorButton active={showVolume} onClick={() => setShowVolume((value) => !value)} label="Volume" />
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-border/50 bg-background/50">
              {market.isPending ? (
                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">Loading market data…</div>
              ) : market.isError ? (
                <div className="p-4"><ErrorBanner error={market.error} /></div>
              ) : candles.length > 0 ? (
                <CandlestickChart candles={candles} showSma={showSma} showVolume={showVolume} />
              ) : (
                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">No candle data available.</div>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Metric label="Last" value={price > 0 ? price.toLocaleString(undefined, { maximumFractionDigits: price < 10 ? 5 : 2 }) : "—"} />
              <Metric label="SMA 20" value={formatMetric(sma(candles, 20))} />
              <Metric label="RSI 14" value={formatMetric(rsi(candles, 14))} />
            </div>
          </>
        )}
      </section>

      <section className="rounded-2xl border border-border/60 bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold">Build your trade</h3>
            <p className="text-xs text-muted-foreground">Make the risk decision before the entry.</p>
          </div>
          {side === "long" ? <TrendingUp className="size-5 text-success" /> : <TrendingDown className="size-5 text-destructive" />}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(["long", "short"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSide(value)}
              className={`rounded-xl border py-2.5 text-sm font-bold capitalize ${side === value ? "border-primary bg-primary/10 text-primary" : "border-border"}`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Field label="Risk %" value={riskPct} onChange={setRiskPct} />
          <Field
            label="Stop loss"
            value={stop}
            onChange={setStop}
            placeholder={price > 0 ? (price * (side === "long" ? 0.97 : 1.03)).toFixed(price < 10 ? 5 : 2) : "price"}
          />
          <Field label="Take profit" value={take} onChange={setTake} placeholder="optional" />
        </div>

        <div className="mt-3 rounded-xl bg-muted/40 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimated quantity</span>
            <span className="font-bold">{qty.toLocaleString()} units</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-muted-foreground">Risk amount</span>
            <span className="font-bold">{money(riskAmount)}</span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <ErrorBanner error={open.error} />
          <Button
            className="h-12 w-full font-bold"
            onClick={placeTrade}
            disabled={open.isPending || !market.data?.live || price <= 0}
          >
            {open.isPending ? "Placing…" : !market.data?.live ? "Connect market data to trade" : `Place simulated ${side}`}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">
            Max {MAX_OPEN_POSITIONS} open practice positions · risk capped at 5% per trade
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-bold">Open positions</h3>
        {openTrades.length === 0 ? (
          <EmptyState title="No open practice positions" description="Choose a market, set a stop, then place a simulated trade." />
        ) : (
          <ul className="flex flex-col gap-2">
            {openTrades.map((trade) => {
              const quote = livePrices.data?.[trade.symbol];
              const current = quote?.price ?? Number(trade.entry_price);
              const pnl = quote?.live
                ? pnlFor(trade.side, Number(trade.quantity), Number(trade.entry_price), Number(current))
                : 0;
              return (
                <li key={trade.id} className="rounded-2xl border border-border/60 bg-card p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">
                        {trade.symbol} <span className="text-xs font-medium capitalize text-muted-foreground">{trade.side}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(trade.quantity).toLocaleString()} @ {Number(trade.entry_price).toFixed(2)} · stop{" "}
                        {trade.stop_loss ? Number(trade.stop_loss).toFixed(2) : "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${pnl >= 0 ? "text-success" : "text-destructive"}`}>
                        {quote?.live ? (pnl >= 0 ? "+" : "") + money(pnl) : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">{quote?.live ? `now ${Number(current).toFixed(2)}` : "waiting for quote"}</p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-3 h-9 w-full text-xs font-semibold"
                    disabled={close.isPending}
                    onClick={async () => {
                      try {
                        const result = await close.mutateAsync({ tradeId: trade.id });
                        toast.success(`Closed ${result.symbol} for ${result.pnl >= 0 ? "+" : ""}${money(result.pnl)}`);
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Could not close that position.");
                      }
                    }}
                  >
                    {close.isPending ? "Closing…" : "Close position"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-2"><ErrorBanner error={close.error} /></div>
      </section>

      {closedTrades.length > 0 && (
        <section>
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="size-4" />
            <h3 className="text-sm font-bold">Trade history</h3>
            <span className="text-xs text-muted-foreground">· {wins}/{closedTrades.length} winners · realised {money(realised)}</span>
          </div>
          <ul className="flex flex-col gap-2">
            {closedTrades.slice(0, 10).map((trade) => (
              <li key={trade.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-card px-3.5 py-2.5 text-xs">
                <span>
                  <span className="font-bold">{trade.symbol}</span>{" "}
                  <span className="capitalize text-muted-foreground">{trade.side}</span>{" "}
                  {Number(trade.entry_price).toFixed(2)} → {Number(trade.exit_price ?? 0).toFixed(2)}
                </span>
                <span className={`font-bold ${Number(trade.pnl) >= 0 ? "text-success" : "text-destructive"}`}>
                  {Number(trade.pnl) >= 0 ? "+" : ""}{money(Number(trade.pnl ?? 0))}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function IndicatorButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
    >
      {label}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/30 p-2.5">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs font-bold tabular-nums">{value}</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-muted-foreground">{label}</Label>
      <Input inputMode="decimal" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="h-10" />
    </div>
  );
}

function sma(candles: Candle[], period: number): number | null {
  if (candles.length < period) return null;
  const values = candles.slice(-period).map((candle) => candle.close);
  return values.reduce((sum, value) => sum + value, 0) / period;
}

function rsi(candles: Candle[], period: number): number | null {
  if (candles.length <= period) return null;
  let gains = 0;
  let losses = 0;
  const recent = candles.slice(-(period + 1));
  for (let index = 1; index < recent.length; index += 1) {
    const change = recent[index]!.close - recent[index - 1]!.close;
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function formatMetric(value: number | null) {
  return value == null ? "—" : value.toFixed(2);
}

function CandlestickChart({
  candles,
  showSma,
  showVolume,
}: {
  candles: Candle[];
  showSma: boolean;
  showVolume: boolean;
}) {
  const visible = candles.slice(-60);
  const width = 960;
  const height = 340;
  const padding = { top: 18, right: 16, bottom: showVolume ? 58 : 24, left: 16 };
  const chartTop = padding.top;
  const chartBottom = height - padding.bottom;
  const chartHeight = chartBottom - chartTop;
  const highs = visible.map((candle) => candle.high);
  const lows = visible.map((candle) => candle.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = Math.max(max - min, Number.EPSILON);
  const volumeMax = Math.max(...visible.map((candle) => candle.volume ?? 0), 1);
  const step = (width - padding.left - padding.right) / Math.max(visible.length, 1);
  const candleWidth = Math.max(3, Math.min(10, step * 0.62));

  const y = (value: number) => chartTop + ((max - value) / range) * chartHeight;
  const x = (index: number) => padding.left + step * index + step / 2;

  const smaPoints = visible.map((candle, index) => {
    const sourceIndex = candles.length - visible.length + index;
    const window = candles.slice(Math.max(0, sourceIndex - 19), sourceIndex + 1);
    if (window.length < 20) return null;
    const average = window.reduce((sum, item) => sum + item.close, 0) / window.length;
    return `${x(index)},${y(average)}`;
  }).filter(Boolean).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[680px] w-full" role="img" aria-label="Candlestick price chart">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const value = max - range * ratio;
          const lineY = y(value);
          return (
            <g key={ratio}>
              <line x1={padding.left} x2={width - padding.right} y1={lineY} y2={lineY} stroke="currentColor" opacity="0.08" />
              <text x={width - padding.right} y={lineY - 3} textAnchor="end" fontSize="10" fill="currentColor" opacity="0.45">
                {value.toLocaleString(undefined, { maximumFractionDigits: value < 10 ? 5 : 2 })}
              </text>
            </g>
          );
        })}

        {visible.map((candle, index) => {
          const candleX = x(index);
          const bullish = candle.close >= candle.open;
          const bodyTop = y(Math.max(candle.open, candle.close));
          const bodyBottom = y(Math.min(candle.open, candle.close));
          const bodyHeight = Math.max(1.5, bodyBottom - bodyTop);
          const volumeHeight = showVolume ? ((candle.volume ?? 0) / volumeMax) * 38 : 0;
          return (
            <g key={`${candle.time}-${index}`}>
              <title>{`${candle.time}: O ${candle.open} H ${candle.high} L ${candle.low} C ${candle.close}`}</title>
              <line x1={candleX} x2={candleX} y1={y(candle.high)} y2={y(candle.low)} stroke="currentColor" opacity="0.65" />
              <rect
                x={candleX - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                rx="1"
                fill="currentColor"
                opacity={bullish ? 0.85 : 0.35}
              />
              {showVolume && <rect x={candleX - candleWidth / 2} y={height - 8 - volumeHeight} width={candleWidth} height={volumeHeight} fill="currentColor" opacity="0.12" />}
            </g>
          );
        })}

        {showSma && smaPoints && (
          <polyline points={smaPoints} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.75" />
        )}

        <text x={padding.left} y={height - 12} fontSize="10" fill="currentColor" opacity="0.45">
          {formatChartTime(visible[0]?.time)}
        </text>
        <text x={width - padding.right} y={height - 12} textAnchor="end" fontSize="10" fill="currentColor" opacity="0.45">
          {formatChartTime(visible[visible.length - 1]?.time)}
        </text>
      </svg>
    </div>
  );
}

function formatChartTime(value?: string) {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
