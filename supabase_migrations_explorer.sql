-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL CHECK (plan IN ('free', 'explorer', 'founder', 'legend')),
    status TEXT NOT NULL DEFAULT 'active',
    period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    period_end TIMESTAMPTZ,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure one active subscription per user (optional constraint, depending on business logic)
CREATE UNIQUE INDEX IF NOT EXISTS user_subscriptions_user_id_idx ON public.user_subscriptions(user_id) WHERE status = 'active';

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscriptions
CREATE POLICY "Users can view own subscriptions."
    ON public.user_subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- Create user_deal_clicks table to track monthly claim usage
CREATE TABLE IF NOT EXISTS public.user_deal_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    deal_id TEXT NOT NULL,
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast counts per user per month
CREATE INDEX IF NOT EXISTS user_deal_clicks_user_id_date_idx ON public.user_deal_clicks(user_id, clicked_at);

-- Enable RLS
ALTER TABLE public.user_deal_clicks ENABLE ROW LEVEL SECURITY;

-- Users can read their own clicks
CREATE POLICY "Users can view own deal clicks."
    ON public.user_deal_clicks FOR SELECT
    USING (auth.uid() = user_id);

-- Create a function to check if the user has reached their monthly limit 
-- (This can be used in Postgres or from the Edge/Server logic)
CREATE OR REPLACE FUNCTION get_user_monthly_deal_clicks(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    click_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO click_count
    FROM public.user_deal_clicks
    WHERE user_id = p_user_id
    AND date_trunc('month', clicked_at) = date_trunc('month', CURRENT_DATE);
    
    RETURN click_count;
END;
$$;
