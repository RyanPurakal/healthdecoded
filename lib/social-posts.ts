// Social media post configuration.
// To update: go to Instagram/TikTok, copy the post URL, paste it here.
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

// Posts that represent past events and workshops — shown on the Events page.
// Replace placeholder URLs with real Instagram post URLs.
export const INSTAGRAM_EVENT_POSTS: InstagramPost[] = [
  // { url: 'https://www.instagram.com/p/SHORTCODE/', caption: 'Workshop at New Brunswick' },
];

// Posts that show community partnerships — shown on the About Us page.
export const INSTAGRAM_PARTNERSHIP_POSTS: InstagramPost[] = [
  // { url: 'https://www.instagram.com/p/SHORTCODE/', caption: 'RWJ collaboration' },
];

// Featured TikTok videos shown on the homepage.
export const TIKTOK_FEATURED_POSTS: TikTokPost[] = [
  // { url: 'https://www.tiktok.com/@healthdecodedinit/video/VIDEO_ID', videoId: 'VIDEO_ID' },
];

// Featured Instagram posts shown on the homepage (mix of reels + photos).
export const INSTAGRAM_FEATURED_POSTS: InstagramPost[] = [
  // { url: 'https://www.instagram.com/p/SHORTCODE/' },
];

export const INSTAGRAM_HANDLE = 'healthdecodedinit';
export const TIKTOK_HANDLE = 'healthdecodedinit';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;
export const TIKTOK_URL = `https://www.tiktok.com/@${TIKTOK_HANDLE}`;
