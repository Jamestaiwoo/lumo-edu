import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/lib/api";
import { money } from "@/lib/game";

export function RiskCalculator() {
  const { data: profile } = useProfile();
  const [balance, setBalance] = useState("");
  const [riskPct, setRiskPct] = useState("1");
  const [entry, setEntry] = useState("50");
  const [stop, setStop] = useState("48");
  const [target, setTarget] = useState("56");

  const bal = Number(balance) || Number(profile?.cash_balance ?? 10000);
  const risk = (bal * (Number(riskPct) || 0)) / 100;
  const perShare = Math.abs((Number(entry) || 0) - (Number(stop) || 0));
  const shares = perShare > 0 ? Math.floor(risk / perShare) : 0;
  const reward = Math.abs((Number(target) || 0) - (Number(entry) || 0));
  const rr = perShare > 0 ? reward / perShare : 0;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">
        Work out your size <em>before</em> you enter. Numbers below are for practice on the simulated account.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Account balance" value={balance} onChange={setBalance} placeholder={String(Math.round(bal))} />
        <Field label="Risk per trade (%)" value={riskPct} onChange={setRiskPct} />
        <Field label="Entry price" value={entry} onChange={setEntry} />
        <Field label="Stop loss" value={stop} onChange={setStop} />
        <Field label="Target price" value={target} onChange={setTarget} />
      </div>

      <div className="surface grid gap-3 rounded-2xl border border-primary/25 p-4">
        <Row label="Dollar risk" value={money(risk)} />
        <Row label="Risk per share" value={money(perShare)} />
        <Row label="Position size" value={`${shares} shares`} highlight />
        <Row label="Reward / risk" value={`${rr.toFixed(2)}R`} highlight={rr >= 2} />
        <Row label="Position value" value={money(shares * (Number(entry) || 0))} />
      </div>

      {rr > 0 && rr < 1 && (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-warning">
          Your target is closer than your stop. You'd need a very high win rate for that to work out.
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${highlight ? "text-primary" : ""}`}>{value}</span>
    </div>
  );
}
