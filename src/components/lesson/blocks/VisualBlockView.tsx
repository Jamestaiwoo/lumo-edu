import type { Visual } from "@/content/course/types";
import { BlockCard } from "./BlockChrome";
import { SpreadBar, OrderBookTable, DataTable } from "./VisualPrimitives";
import { PricePathChart, CandleChart } from "./ChartVisuals";

function VisualBody({ visual }: { visual: Visual }) {
  switch (visual.type) {
    case "spread":
      return (
        <SpreadBar
          label={visual.label}
          bid={visual.bid}
          ask={visual.ask}
          unit={visual.unit}
          caption={visual.caption}
        />
      );
    case "order-book":
      return <OrderBookTable book={visual.book} caption={visual.caption} />;
    case "price-path":
      return (
        <PricePathChart
          label={visual.label}
          points={visual.points}
          markers={visual.markers ?? []}
          caption={visual.caption}
        />
      );
    case "candles":
      return (
        <CandleChart
          label={visual.label}
          candles={visual.candles}
          zones={visual.zones ?? []}
          caption={visual.caption}
        />
      );
    case "table":
      return (
        <DataTable
          label={visual.label}
          columns={visual.columns}
          rows={visual.rows}
          caption={visual.caption}
        />
      );
    default:
      return null;
  }
}

export function VisualBlockView({ title, visual }: { title: string; visual: Visual }) {
  return (
    <BlockCard eyebrow="Visual" title={title}>
      <VisualBody visual={visual} />
    </BlockCard>
  );
}
