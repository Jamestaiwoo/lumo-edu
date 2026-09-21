import type { OrderBookSnapshot } from "@/content/course/types";

export function Caption({ children }: { children: string }) {
  return <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{children}</p>;
}

export function SpreadBar({
  label,
  bid,
  ask,
  unit,
  caption,
}: {
  label: string;
  bid: number;
  ask: number;
  unit: string;
  caption: string;
}) {
  const spread = +(ask - bid).toFixed(4);
  const pct = bid > 0 ? (spread / bid) * 100 : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold text-muted-foreground">{label}</span>
        <span className="font-bold">
          Spread {(spread * 100).toFixed(2)}c · {pct.toFixed(2)}%
        </span>
      </div>

      <div className="mt-3 flex items-stretch overflow-hidden rounded-2xl border border-border/60">
        <div className="flex-1 bg-destructive/10 px-3 py-3 text-center">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Bid</p>
          <p className="text-lg font-bold">{bid.toFixed(2)}</p>
          <p className="text-[10px] text-muted-foreground">sellers receive</p>
        </div>
        <div className="flex w-16 shrink-0 items-center justify-center bg-secondary text-[11px] font-bold">
          gap
        </div>
        <div className="flex-1 bg-success/10 px-3 py-3 text-center">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Ask</p>
          <p className="text-lg font-bold">{ask.toFixed(2)}</p>
          <p className="text-[10px] text-muted-foreground">buyers pay</p>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">Quoted in {unit}</p>
      <Caption>{caption}</Caption>
    </div>
  );
}

export function OrderBookTable({ book, caption }: { book: OrderBookSnapshot; caption: string }) {
  const bestAsk = book.asks[0]?.price;
  const bestBid = book.bids[0]?.price;
  const mid =
    bestAsk !== undefined && bestBid !== undefined ? ((bestAsk + bestBid) / 2).toFixed(3) : "—";

  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{book.label}</p>
      <div className="mt-2 overflow-hidden rounded-2xl border border-border/60 text-xs">
        <div className="flex items-center justify-between bg-secondary px-3 py-1.5 font-semibold">
          <span>Price</span>
          <span>Size ({book.unit})</span>
        </div>
        {book.asks.map((level) => (
          <div
            key={`ask-${level.price}`}
            className="flex items-center justify-between bg-destructive/10 px-3 py-1.5"
          >
            <span className="font-semibold">{level.price.toFixed(2)}</span>
            <span className="text-muted-foreground">{level.size.toLocaleString("en-US")}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-secondary/60 px-3 py-1 font-bold">
          <span>Mid</span>
          <span>{mid}</span>
        </div>
        {book.bids.map((level) => (
          <div
            key={`bid-${level.price}`}
            className="flex items-center justify-between bg-success/10 px-3 py-1.5"
          >
            <span className="font-semibold">{level.price.toFixed(2)}</span>
            <span className="text-muted-foreground">{level.size.toLocaleString("en-US")}</span>
          </div>
        ))}
      </div>
      <Caption>{caption}</Caption>
    </div>
  );
}

export function DataTable({
  label,
  columns,
  rows,
  caption,
}: {
  label: string;
  columns: string[];
  rows: string[][];
  caption?: string | undefined;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="mt-2 overflow-x-auto rounded-2xl border border-border/60">
        <table className="w-full min-w-[22rem] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-secondary">
              {columns.map((column) => (
                <th key={column} className="px-3 py-2 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-border/50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row.join("|")}-${cellIndex}`}
                    className={`px-3 py-2 ${cellIndex === 0 ? "font-semibold" : "text-muted-foreground"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <Caption>{caption}</Caption> : null}
    </div>
  );
}
