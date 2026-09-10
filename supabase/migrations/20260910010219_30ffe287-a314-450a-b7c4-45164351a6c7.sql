-- 1. paper_accounts
CREATE TABLE public.paper_accounts (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  starting_balance NUMERIC(14,2) NOT NULL DEFAULT 10000,
  current_balance NUMERIC(14,2) NOT NULL DEFAULT 10000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.paper_accounts TO authenticated;
GRANT ALL ON public.paper_accounts TO service_role;

ALTER TABLE public.paper_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own paper account select" ON public.paper_accounts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own paper account insert" ON public.paper_accounts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own paper account update" ON public.paper_accounts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- backfill from existing profiles
INSERT INTO public.paper_accounts (user_id, starting_balance, current_balance)
SELECT p.id, 10000, COALESCE(p.cash_balance, 10000)
FROM public.profiles p
ON CONFLICT (user_id) DO NOTHING;

-- 2. paper_ledger
CREATE TABLE public.paper_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trade_id UUID REFERENCES public.paper_trades(id) ON DELETE SET NULL,
  kind TEXT NOT NULL,
  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  balance_after NUMERIC(14,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.paper_ledger TO authenticated;
GRANT ALL ON public.paper_ledger TO service_role;

ALTER TABLE public.paper_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own ledger select" ON public.paper_ledger
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own ledger insert" ON public.paper_ledger
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

GRANT INSERT ON public.paper_ledger TO authenticated;

CREATE INDEX paper_ledger_user_created_idx ON public.paper_ledger (user_id, created_at DESC);

-- 3. reward_events (idempotency ledger)
CREATE TABLE public.reward_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_key TEXT NOT NULL,
  kind TEXT NOT NULL,
  xp_awarded INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, source_key)
);

GRANT SELECT, INSERT ON public.reward_events TO authenticated;
GRANT ALL ON public.reward_events TO service_role;

ALTER TABLE public.reward_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own reward events select" ON public.reward_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own reward events insert" ON public.reward_events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 4. paper_trades additions
ALTER TABLE public.paper_trades
  ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES public.paper_accounts(user_id) ON DELETE CASCADE;

UPDATE public.paper_trades SET account_id = user_id WHERE account_id IS NULL;

CREATE INDEX IF NOT EXISTS paper_trades_user_status_idx ON public.paper_trades (user_id, status);

-- 5. keep paper_accounts.updated_at fresh
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER paper_accounts_touch
  BEFORE UPDATE ON public.paper_accounts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 6. create a paper account alongside the profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1), 'Trader'))
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.paper_accounts (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;