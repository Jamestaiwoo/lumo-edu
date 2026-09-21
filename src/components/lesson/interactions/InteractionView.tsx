import type { Interaction } from "@/content/course/types";
import { DecisionInteractionView } from "./DecisionInteractionView";
import { SpreadExplorerView } from "./SpreadExplorerView";
import { OrderTypeSimulatorView } from "./OrderTypeSimulatorView";
import { ChartReadView } from "./ChartReadView";
import { PositionSizeBuilderView } from "./PositionSizeBuilderView";
import { TradePlanBuilderView } from "./TradePlanBuilderView";

export function InteractionView({
  title,
  interaction,
  takeaway,
}: {
  title: string;
  interaction: Interaction;
  takeaway: string;
}) {
  switch (interaction.type) {
    case "scenario-decision":
      return (
        <DecisionInteractionView
          title={title}
          prompt={interaction.prompt}
          choices={interaction.choices}
          takeaway={takeaway}
        />
      );
    case "order-book-decision":
      return (
        <DecisionInteractionView
          title={title}
          prompt={interaction.prompt}
          book={interaction.book}
          choices={interaction.choices}
          takeaway={takeaway}
        />
      );
    case "spread-explorer":
      return (
        <SpreadExplorerView
          title={title}
          prompt={interaction.prompt}
          caption={interaction.caption}
          unit={interaction.unit}
          levels={interaction.levels}
          takeaway={takeaway}
        />
      );
    case "order-type-simulator":
      return (
        <OrderTypeSimulatorView
          title={title}
          prompt={interaction.prompt}
          symbol={interaction.symbol}
          unit={interaction.unit}
          bid={interaction.bid}
          ask={interaction.ask}
          ticks={interaction.ticks}
          takeaway={takeaway}
        />
      );
    case "chart-read":
      return (
        <ChartReadView
          title={title}
          prompt={interaction.prompt}
          label={interaction.label}
          candles={interaction.candles}
          zones={interaction.zones}
          tasks={interaction.tasks}
          takeaway={takeaway}
        />
      );
    case "position-size-builder":
      return (
        <PositionSizeBuilderView
          title={title}
          prompt={interaction.prompt}
          currency={interaction.currency}
          defaults={interaction.defaults}
          mission={interaction.mission}
          takeaway={takeaway}
        />
      );
    case "trade-plan-builder":
      return (
        <TradePlanBuilderView
          title={title}
          prompt={interaction.prompt}
          symbols={interaction.symbols}
          fields={interaction.fields}
          checklist={interaction.checklist}
          defaults={interaction.defaults}
          takeaway={takeaway}
        />
      );
  }
}
