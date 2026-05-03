-- Add category column to affiliate_items
ALTER TABLE affiliate_items ADD COLUMN IF NOT EXISTS category text;

-- Create affiliate_clicks table
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_item_id uuid NOT NULL REFERENCES affiliate_items(id) ON DELETE CASCADE,
  clicked_at timestamptz NOT NULL DEFAULT now(),
  user_agent text
);

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_item_id ON affiliate_clicks(affiliate_item_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at);
