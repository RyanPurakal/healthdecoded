'use client';

// Instagram and TikTok embed components using each platform's official embed.js scripts.
// Instagram: requires post URLs in lib/social-posts.ts
// TikTok: requires video IDs in lib/social-posts.ts

import { useEffect, useRef } from 'react';
import { INSTAGRAM_URL, TIKTOK_URL } from '@/lib/social-posts';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
    tiktokEmbed?: { lib: { render: () => void } };
  }
}

// ── Instagram embed ─────────────────────────────────────────────────────────

export function InstagramEmbed({ url, caption }: { url: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const reinit = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm) {
      reinit();
    } else {
      const existing = document.getElementById('instagram-embed-js');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-js';
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = reinit;
        document.body.appendChild(script);
      } else {
        // script already loading — poll until instgrm is available
        const interval = setInterval(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
            clearInterval(interval);
          }
        }, 150);
        return () => clearInterval(interval);
      }
    }
  }, [url]);

  return (
    <div ref={ref} className="social-embed-wrapper">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          {caption || 'View on Instagram'}
        </a>
      </blockquote>
    </div>
  );
}

// ── TikTok embed ─────────────────────────────────────────────────────────────

export function TikTokEmbed({ url, videoId, caption }: { url: string; videoId: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const existing = document.getElementById('tiktok-embed-js');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-js';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [videoId]);

  return (
    <div ref={ref} className="social-embed-wrapper">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: 605, minWidth: 325 }}
      >
        <section>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
            {caption || 'View on TikTok'}
          </a>
        </section>
      </blockquote>
    </div>
  );
}

// ── Fallback "follow us" card ─────────────────────────────────────────────────

export function SocialFollowCard({
  platform,
  handle,
  href,
  color = '#E1306C',
}: {
  platform: 'Instagram' | 'TikTok';
  handle: string;
  href: string;
  color?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-follow-card"
      aria-label={`Follow @${handle} on ${platform}`}
    >
      <span className="social-follow-card__icon" aria-hidden="true">
        {platform === 'Instagram' ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34v-7a8.16 8.16 0 0 0 4.77 1.52V6.38a4.85 4.85 0 0 1-1-.31z"/>
          </svg>
        )}
      </span>
      <span className="social-follow-card__text">
        <span className="social-follow-card__platform">{platform}</span>
        <span className="social-follow-card__handle">@{handle}</span>
      </span>
      <span className="social-follow-card__cta" style={{ color }}>Follow →</span>
    </a>
  );
}

// ── Social section: shows embeds if post URLs are configured, else follow cards ──

export function SocialFeedSection({
  instagramPosts = [],
  tiktokPosts = [],
  title = 'Follow Our Journey',
  subtitle,
}: {
  instagramPosts?: { url: string; caption?: string }[];
  tiktokPosts?: { url: string; videoId: string; caption?: string }[];
  title?: string;
  subtitle?: string;
}) {
  const hasContent = instagramPosts.length > 0 || tiktokPosts.length > 0;

  return (
    <div className="social-feed-section">
      <div className="social-feed-section__header">
        <p className="hd-app-eyebrow">Social</p>
        <h2 className="hd-app-heading">{title}</h2>
        {subtitle && <p className="hd-app-subtitle">{subtitle}</p>}
      </div>

      {hasContent ? (
        <div className="social-embed-grid">
          {instagramPosts.map((p, i) => (
            <InstagramEmbed key={`ig-${i}`} url={p.url} caption={p.caption} />
          ))}
          {tiktokPosts.map((p, i) => (
            <TikTokEmbed key={`tt-${i}`} url={p.url} videoId={p.videoId} caption={p.caption} />
          ))}
        </div>
      ) : (
        <div className="social-follow-cards">
          <SocialFollowCard
            platform="Instagram"
            handle={INSTAGRAM_URL.split('/').pop()!}
            href={INSTAGRAM_URL}
            color="#E1306C"
          />
          <SocialFollowCard
            platform="TikTok"
            handle={TIKTOK_URL.split('@').pop()!}
            href={TIKTOK_URL}
            color="#000"
          />
        </div>
      )}
    </div>
  );
}
