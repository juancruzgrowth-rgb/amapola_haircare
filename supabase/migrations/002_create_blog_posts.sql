CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  related_product_id TEXT NOT NULL,
  product_recommendation_text TEXT NOT NULL,
  target_audience TEXT DEFAULT 'female' CHECK (target_audience IN ('female', 'male', 'both')),
  status TEXT DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'published', 'rejected')),
  approval_token UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ,
  newsletter_sent_at TIMESTAMPTZ
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON blog_posts
  FOR SELECT USING (status = 'published');
