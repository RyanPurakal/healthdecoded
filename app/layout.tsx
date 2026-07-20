// Root layout: sets site-wide HTML metadata, injects Google Analytics + JSON-LD structured data, and wraps every page in ClientLayout (Navbar/Footer/DonateModal shell).
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { AnalyticsScript, StructuredData } from './AnalyticsScript';
import { ClientLayout } from './ClientLayout';
import './globals.css';
import './site-theme.css';
import './hd-app.css';

const SITE = 'https://healthdecodedinitiative.org';
const BRAND = 'Health Decoded';
const defaultDescription =
  'Official Health Decoded Initiative site: youth health literacy workshops, peer ambassador programs, and student resources. Building an international community of young people through health education.';
const defaultOgDescription =
  'Official nonprofit supporting youth health literacy: workshops, peer programs, and educational resources for students worldwide.';

/** Shared social image: verified asset under /public. */
const socialImages = [
  { url: '/logo512.png', width: 512, height: 512, alt: `${BRAND} logo` },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  applicationName: BRAND,
  title: {
    default: BRAND,
    template: `%s | ${BRAND}`,
  },
  description: defaultDescription,
  keywords:
    'Health Decoded Initiative, health education nonprofit, health education, health literacy, youth education, health workshops, peer ambassadors, health advocacy, student health, medical education',
  authors: [{ name: 'Health Decoded Initiative' }],
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/logo192.png', sizes: '192x192', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE}/`,
    title: BRAND,
    description: defaultOgDescription,
    siteName: BRAND,
    images: socialImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND,
    description: defaultOgDescription,
    images: ['/logo512.png'],
  },
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    title: BRAND,
  },
};

export const viewport: Viewport = {
  themeColor: '#e6ecf0',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AnalyticsScript />
        <StructuredData />
        {/*
          Icons also declared via metadata.icons; explicit og:site_name / application-name
          are emitted by Next from metadata.openGraph.siteName and metadata.applicationName.
        */}
        <link rel="apple-touch-icon" href="/logo192.png" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
