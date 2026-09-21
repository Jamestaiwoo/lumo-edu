import type { Candle, ChartZone, VisualMarker } from "@/content/course/types";
import { Caption } from "./VisualPrimitives";

const W = 320;
const PAD = 12;

function scaleY(value: number, min: number, max: number, height: number) {
  if (max === min) return height / 2;
  return height - PAD - ((value - min) / (max - min)) * (height - 2 * PAD);
}

export function PricePathChart({
  label,
  points,
  markers,
  caption,
}: {
  label: string;
  points: number[];
  markers: VisualMarker[];
  caption: string;
}) {
  const height = 140;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const stepX = points.length > 1 ? (W - 2 * PAD) / (points.length - 1) : 0;
  const x = (index: number) => PAD + index * stepX;
  const y = (value: number) => scaleY(value, min, max, height);

  const path = points.map((point, index) => `${x(index)},${y(point)}`).join(" ");
  const toneOf = (tone: VisualMarker["tone"]) =>
    tone === "up" ? "text-success" : tone === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold text-muted-foreground">{label}</span>
        <span className="font-bold">
          {min.toFixed(2)} – {max.toFixed(2)}
        </span>
      </div>

      <div className="mt-2 rounded-2xl border border-border/60 bg-secondary/20 p-1">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          className="h-40 w-full text-primary"
          role="img"
          aria-label={label}
        >
          <g className="text-border">
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1={PAD}
                x2={W - PAD}
                y1={scaleY(min + (max - min) * ratio, min, max, height)}
                y2={scaleY(min + (max - min) * ratio, min, max, height)}
                stroke="currentColor"
                strokeDasharray="3 4"
                strokeWidth={1}
              />
            ))}
          </g>
          <polyline
            points={path}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {points.map((point, index) => (
            <circle
              key={`${index}-${point}`}
              cx={x(index)}
              cy={y(point)}
              r={2}
              fill="currentColor"
            />
          ))}
          {markers.map((marker) => (
            <g key={`${marker.index}-${marker.label}`} className={toneOf(marker.tone)}>
              <circle
                cx={x(marker.index)}
                cy={y(points[marker.index] ?? min)}
                r={4.5}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              />
              <text
                x={Math.min(x(marker.index) + 8, W - 62)}
                y={Math.max(y(points[marker.index] ?? min) - 6, 12)}
                fontSize={10}
                fill="currentColor"
              >
                {marker.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <Caption>{caption}</Caption>
    </div>
  );
}

export function CandleChart({
  label,
  candles,
  zones,
  caption,
}: {
  label: string;
  candles: Candle[];
  zones: ChartZone[];
  caption: string;
}) {
  const height = 170;
  const gutter = 60;
  const values = [
    ...candles.flatMap((candle) => [candle.high, candle.low]),
    ...zones.map((zone) => zone.price),
  ];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const slot = (W - 2 * PAD - gutter) / Math.max(candles.length, 1);
  const bodyWidth = Math.max(slot * 0.55, 3);
  const y = (value: number) => scaleY(value, min, max, height);

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold text-muted-foreground">{label}</span>
        <span className="font-bold">
          {min.toFixed(2)} – {max.toFixed(2)}
        </span>
      </div>

      <div className="mt-2 rounded-2xl border border-border/60 bg-secondary/20 p-1">
        <svg viewBox={`0 0 ${W} ${height}`} className="h-44 w-full" role="img" aria-label={label}>
          {zones.map((zone) => (
            <g
              key={zone.label}
              className={zone.tone === "support" ? "text-success" : "text-destructive"}
            >
              <line
                x1={PAD}
                x2={W - PAD - gutter + 6}
                y1={y(zone.price)}
                y2={y(zone.price)}
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth={1.2}
                opacity={0.7}
              />
              <text
                x={W - PAD - gutter + 10}
                y={y(zone.price) + 3}
                fontSize={8.5}
                fill="currentColor"
                opacity={0.9}
              >
                {zone.label}
              </text>
            </g>
          ))}

          {candles.map((candle, index) => {
            const centre = PAD + index * slot + slot / 2;
            const up = candle.close >= candle.open;
            const bodyTop = y(Math.max(candle.open, candle.close));
            const bodyBottom = y(Math.min(candle.open, candle.close));
            return (
              <g
                key={`${index}-${candle.close}`}
                className={up ? "text-success" : "text-destructive"}
              >
                <line
                  x1={centre}
                  x2={centre}
                  y1={y(candle.high)}
                  y2={y(candle.low)}
                  stroke="currentColor"
                  strokeWidth={1.2}
                />
                <rect
                  x={centre - bodyWidth / 2}
                  y={bodyTop}
                  width={bodyWidth}
                  height={Math.max(bodyBottom - bodyTop, 1.5)}
                  fill="currentColor"
                  rx={0.5}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-sm bg-success" aria-hidden /> closed up
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-sm bg-destructive" aria-hidden /> closed down
        </span>
        <span>wicks reach the high and low</span>
      </div>
      <Caption>{caption}</Caption>
    </div>
  );
}
