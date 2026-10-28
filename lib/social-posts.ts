// Social media post configuration.
// To add more: go to Instagram, copy the post URL, paste it below.
// Instagram URL format:  https://www.instagram.com/p/POST_SHORTCODE/
// TikTok URL format:     https://www.tiktok.com/@healthdecodedinit/video/VIDEO_ID

export type InstagramPost = {
  url: string;
  caption?: string;
};

export type TikTokPost = {
  url: string;
  videoId: string;
  caption?: string;
};

// All Instagram posts (photo posts only, newest first) — shown on the Events page as past event highlights.
export const INSTAGRAM_EVENT_POSTS: InstagramPost[] = [
  { url: 'https://www.instagram.com/p/Dezr4PUGgrH/' },
  { url: 'https://www.instagram.com/p/DeKxAQORI_O/' },
  { url: 'https://www.instagram.com/p/DdwcFmORupW/' },
  { url: 'https://www.instagram.com/p/DdwbS4UkZaf/' },
  { url: 'https://www.instagram.com/p/DdRoaJkxi5J/' },
  { url: 'https://www.instagram.com/p/DdKZzWUFmYu/' },
  { url: 'https://www.instagram.com/p/DcY9JtjlUSe/' },
  { url: 'https://www.instagram.com/p/Dbvr3qpCQZy/' },
  { url: 'https://www.instagram.com/p/Dbi9LY2zliD/' },
  { url: 'https://www.instagram.com/p/DbbBGAviYpG/' },
  { url: 'https://www.instagram.com/p/DbLu-5fieA0/' },
  { url: 'https://www.instagram.com/p/DanwHTnERz3/' },
  { url: 'https://www.instagram.com/p/DaVrklRkQ8M/' },
  { url: 'https://www.instagram.com/p/DaD2kB7kZ8H/' },
  { url: 'https://www.instagram.com/p/DZ2x4MgxhWR/' },
  { url: 'https://www.instagram.com/p/DZfpUG2kT2j/' },
  { url: 'https://www.instagram.com/p/DZNmKu-kVBk/' },
  { url: 'https://www.instagram.com/p/DY2t7jSRO4G/' },
  { url: 'https://www.instagram.com/p/DY2cXnaEaTX/' },
  { url: 'https://www.instagram.com/p/DYnPoj1FlKh/' },
  { url: 'https://www.instagram.com/p/DYXk6E9kaM8/' },
  { url: 'https://www.instagram.com/p/DX7IM1sEaur/' },
  { url: 'https://www.instagram.com/p/DXnJdleET_q/' },
  { url: 'https://www.instagram.com/p/DXf3SkmF6zD/' },
  { url: 'https://www.instagram.com/p/DXPSc8SkTTD/' },
  { url: 'https://www.instagram.com/p/DWsG1lPl3mO/' },
  { url: 'https://www.instagram.com/p/DWZR1GoEUmB/' },
  { url: 'https://www.instagram.com/p/DWKiBiIkT2e/' },
  { url: 'https://www.instagram.com/p/DV6UDuQkUCN/' },
  { url: 'https://www.instagram.com/p/DVjOQnykeT0/' },
  { url: 'https://www.instagram.com/p/DVaAKnwkZbd/' },
  { url: 'https://www.instagram.com/p/DVRb_2XkU3Y/' },
  { url: 'https://www.instagram.com/p/DU_NiPFkTSt/' },
  { url: 'https://www.instagram.com/p/DUtrGTZEUl3/' },
  { url: 'https://www.instagram.com/p/DUbSLIGERgM/' },
  { url: 'https://www.instagram.com/p/DUJTdCHkX14/' },
  { url: 'https://www.instagram.com/p/DTti5nnF_Q4/' },
];

// Posts that show community partnerships — update these with the specific posts
// featuring RWJ, St. Peter's, Rutgers CLC, or New Brunswick Public Schools.
export const INSTAGRAM_PARTNERSHIP_POSTS: InstagramPost[] = [
  // Paste the URLs of posts that feature your partner organizations here.
];

// 6 most recent posts shown in the "Follow Our Journey" section on the homepage.
export const INSTAGRAM_FEATURED_POSTS: InstagramPost[] = [
  { url: 'https://www.instagram.com/p/Dezr4PUGgrH/' },
  { url: 'https://www.instagram.com/p/DeKxAQORI_O/' },
  { url: 'https://www.instagram.com/p/DdwcFmORupW/' },
  { url: 'https://www.instagram.com/p/DdwbS4UkZaf/' },
  { url: 'https://www.instagram.com/p/DdRoaJkxi5J/' },
  { url: 'https://www.instagram.com/p/DdKZzWUFmYu/' },
];

// Featured TikTok videos shown on the homepage alongside the Instagram posts.
export const TIKTOK_FEATURED_POSTS: TikTokPost[] = [
  // { url: 'https://www.tiktok.com/@healthdecodedinit/video/VIDEO_ID', videoId: 'VIDEO_ID' },
];

export const INSTAGRAM_HANDLE = 'healthdecodedinitiative';
export const TIKTOK_HANDLE = 'healthdecodedinit';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;
export const TIKTOK_URL = `https://www.tiktok.com/@${TIKTOK_HANDLE}`;
