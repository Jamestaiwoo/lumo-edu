# Lumo V1.5 — trustworthy scoring, real paper accounts, account recovery

An incremental upgrade of the existing app. Same five tabs, same lessons, same look — but the scoring and the practice account are now calculated and enforced on the server, sign-in problems are recoverable, and every screen has proper loading, empty and error states.

## 1. Scoring you can trust

Today the app works out XP, levels, streaks and badges in the browser and writes the result to the database. Anyone could change those numbers.

- Finishing a lesson now sends only the answers to the server. The server marks each answer, works out XP, level, streak and any badges earned, and saves them.
- Repeating a lesson still records a better score and practice attempt, but the completion bonus is paid once per lesson, ever. A reward ledger enforces this, so a double-tap or a page refresh cannot pay twice.
- The daily streak advances at most once per day, using the server's date.
- Badge awards move to the server too.

## 2. A real practice account

- New practice-account record per learner: starting balance, current balance, timestamps. Existing balances from the current profiles are copied across, so nobody loses progress.
- Every open and close writes a ledger row, so the balance is always explainable rather than a number the browser typed in.
- Placing and closing a trade is validated on the server: stop must sit on the correct side of the price for long vs short, target on the other, entry and exit prices must be sane, quantity/risk is recalculated server-side, risk is capped at 5% of the account, there must be enough buying power, and the maximum of five open positions is enforced. Profit or loss and the new balance are calculated by the server, never accepted from the browser.
- The practice screens carry the exact line **SIMULATED TRADING — NO REAL MONEY**, plus the existing note that prices are simulated.

## 3. Getting back into an account

- "Forgot password" on the sign-in screen, sending a reset email.
- A reset-password page that accepts the emailed link and sets a new password.
- "Resend confirmation email" for people who never clicked the first one.
- Clear waiting, sent, and failed states with plain-language messages instead of raw errors.
- When a session quietly expires, the app says so and returns to sign-in instead of showing a broken screen.

## 4. Consistent loading, empty and error states

Four small shared pieces — loading skeleton, empty state, error state with a Retry button, and an inline error banner — applied to Home, Learn, Lesson, Practice, Coach, Paper Trading, Journal, Profile and Achievements. Database failures surface as a visible error with retry; they are never hidden behind an empty list.

## 5. Colour tuning

The brand mark's neon lime-green becomes the primary colour and glow, replacing the current teal. Backgrounds, cards, typography, spacing and navigation stay as they are. Success/warning/error colours are re-tuned so lime stays reserved for brand and primary actions.

## 6. Testing

- Automated checks for the scoring rules (XP maths, level, streak roll-over, repeat-lesson idempotency) and the trade validation rules (stop/target direction, risk cap, buying power, profit/loss maths).
- A scripted pass through the live app: sign up, forgot password, sign in, complete a lesson, repeat the same lesson, place and close a trade, add a journal entry, view profile and achievements, and force an error to confirm the retry state.

---

## Technical detail

**Migrations (additive only, no drops):**
- `paper_accounts` (user_id unique, starting_balance, current_balance, created_at, updated_at) + backfill from `profiles.cash_balance`.
- `paper_ledger` (account_id, trade_id, kind, amount, balance_after, created_at).
- `reward_events` (user_id, source_key unique per user, kind, xp_awarded, created_at) for idempotency.
- `paper_trades`: add nullable `account_id`, backfill, index on (user_id, status).
- GRANTs for `authenticated` + `service_role`, RLS scoped to `auth.uid()` on all new tables. Ledger and reward tables are read-only to the user; writes happen through server functions.
- `profiles.cash_balance` is left in place and kept in sync so nothing existing breaks.

**New server functions** (`requireSupabaseAuth`, RLS as the user):
- `src/lib/progress.functions.ts` — `completeLesson({ lessonId, answers })`; grades against the server copy of `src/content/curriculum.ts`, writes attempts, progress, reward event, profile totals, achievements; returns the authoritative result.
- `src/lib/trading.functions.ts` — `openTrade`, `closeTrade`, `getPaperAccount`; server recomputes price from the shared deterministic `market.ts`, validates, writes trade + ledger + balance in order.

**Client changes:** `src/lib/api.ts` hooks call the server functions via `useServerFn` instead of writing directly; local XP/PNL maths becomes display-only. Existing query keys and component props stay unchanged where possible.

**New files:** `src/components/state/{QueryBoundary,LoadingState,EmptyState,ErrorState}.tsx`, `src/routes/reset-password.tsx`, `src/lib/progress.functions.ts`, `src/lib/trading.functions.ts`, `src/lib/scoring.ts` (pure, shared + tested), tests under `src/lib/__tests__/`.

**Touched:** `src/styles.css` (lime tokens), `src/routes/auth.tsx`, all authenticated routes and practice components for the state components and the simulated-trading banner.
