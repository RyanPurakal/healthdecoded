-- Add news_category to news_posts to distinguish member-written posts from external health news
ALTER TABLE news_posts
  ADD COLUMN IF NOT EXISTS news_category text NOT NULL DEFAULT 'member'
    CHECK (news_category IN ('member', 'external'));

GRANT UPDATE (news_category) ON news_posts TO authenticated;
