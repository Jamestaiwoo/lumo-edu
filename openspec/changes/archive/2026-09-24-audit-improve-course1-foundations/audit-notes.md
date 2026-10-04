# Content Audit Findings — Course 1 (Task 4.1)

Walked tf-l1…tf-l10 statically (every example, visual, interaction, practice, check, scenario). Arc order and schema coverage already enforced by tests — all pass. Numeric cross-checks verified by hand.

## Defects found (to fix in 4.2)

1. **tf-l3 example title** "Three cents in one second" — the walk is 20.15 → 20.24 = **9 cents** (three levels, three ticks, but nine cents of price). Retitle.
2. **tf-l4 scenario feedback (option 0)** — "$40 — the same as a 1% move on a $4,000 position": arithmetic is internally true but the scenario's actual notional is 400 × ~42.2 ≈ $16,900; comparing to $4,000 confuses. Rephrase relative to the real position ($40 ≈ 0.24% of $16,900).
3. **tf-l6 visual caption** — "the lows from the fourth candle onward keep rising": false — candle 9's low (20.02) dips below candle 8's (20.18). Candle 9 is a legitimate pullback; fix the wording, not the data.
4. **tf-l6 chart-read task 1 prompt** — "rising lows across the second half": same non-monotonic issue. Reword to the fourth-through-eighth candles.
5. **tf-l1 price-path marker** — "higher low" at index 7 (44.6 is a local *high*); the higher low is index 8 (43.2). Move marker.
6. **tf-l8 trade-plan-builder prompt** — claims the builder checks "the loss stays inside your risk ceiling", but the builder validates ordered levels + risk% ≤ 5 only (no balance input, no dollar ceiling). Reword to what it actually checks.
7. **tf-l9 cost table row 1** — ETF spread cost $0.05 on $1,000 is 0.005%, displayed as "0.01%" (2× overstatement via rounding). Use "<0.01%".

## Verified consistent (no action)

- tf-l2: 300-share walk (2,016+2,017+2,018=6,051 → 20.17 avg, $3 cost) ✓; book/interactive/example all same snapshot ✓
- tf-l4: $10 round trip (1,000 × 0.01) ✓; 20 round trips ≈ $200 ≈ 1% of $20,000 ✓; spread-explorer %s ✓ (0.13/1.02 ≈ 12% round trip); practice numeric answer 10 matches example ✓
- tf-l4 ↔ tf-l9: cost table derived from l4 quotes ×2 crossings ✓ ($0.05, $0.22, $4.74, $196)
- tf-l5: visual markers ↔ simulator ticks (limit 20.10 fills at tick 5 = index 4) ✓ — same data the simulator unit tests use ✓; $1 Priya premium ✓; ORCA ~10% ✓; $30 numeric ✓
- tf-l6: example candle == candle 4 of the visual (0.12 body, 0.27 from high, 0.13 wick) ✓; zones 20.40–20.48 / 19.55–19.70 match candle extremes ✓; final close 20.46 above resistance ✓
- tf-l7: drawdown table (0.995¹⁰=9,511, 0.99¹⁰=9,044, 0.95¹⁰=5,987, 0.75¹⁰=563; recovery +5.1/10.6/67/1,676%) ✓; 100/2=50 shares ✓; 50% loss → 100% gain ✓; mission reachable at 1% risk ✓; $75/$1.50=50 ✓
- tf-l8: $100/0.42≈238 ✓; B's $250 loss ✓; scenario stop logic (19.66 < 19.68 triggers) ✓; builder defaults pass validation ✓
- tf-l9: 3×$10=$30/day, $600/month=60% ✓; 40×$7.50=$300 ✓; "10% spread"/"20% handicap" for ORCA ✓
- tf-l10: $100/0.52≈192 shares ≈ $3,878 ✓; capstone 0.5%×20,000/2=50 ✓; 192×0.52≈$100 ✓

## Notes

- Each lesson's book/quote snapshots differ between lessons by design ("simulated"); each is internally consistent — no fix needed.
- Check-block "first attempt counts" copy matches the implemented lock-after-reveal semantics; practice blocks retry locally. Consistent with the new formative-vs-graded copy (Task 2.1).
