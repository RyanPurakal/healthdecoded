// Root layout: sets site-wide HTML metadata, injects Google Analytics + JSON-LD structured data, and wraps every page in ClientLayout (Navbar/Footer/DonateModal shell).
import type { ReactNode } from 'react';
import { AnalyticsScript, StructuredData } from './AnalyticsScript';
import { ClientLayout } from './ClientLayout';
import './globals.css';
import './site-theme.css';

export const metadata = {
  /** Shown in browser/app UI where supported (tabs, Add to Home Screen, some pickers) */
  applicationName: 'Health Decoded',
  title: {
    default:
      'Health Decoded Initiative — Youth health education nonprofit',
    template: '%s | Health Decoded Initiative',
  },
  description:
    'Official Health Decoded Initiative site: youth health literacy workshops, peer ambassador programs, and student resources. Building an international community of young people through health education.',
  keywords:
    'Health Decoded Initiative, health education nonprofit, health education, health literacy, youth education, health workshops, peer ambassadors, health advocacy, student health, medical education',
  authors: [{ name: 'Health Decoded Initiative' }],
  openGraph: {
    type: 'website',
    url: 'https://healthdecodedinitiative.org/',
    title: 'Health Decoded Initiative — Youth health education nonprofit',
    description:
      'Official nonprofit supporting youth health literacy: workshops, peer programs, and educational resources for students worldwide.',
    siteName: 'Health Decoded Initiative',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Decoded Initiative — Youth health education nonprofit',
    description:
      'Official nonprofit supporting youth health literacy: workshops, peer programs, and educational resources for students worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
  manifest: '/manifest.json',
  metadataBase: new URL('https://healthdecodedinitiative.org'),
  appleWebApp: {
    title: 'Health Decoded',
  },
};

export const viewport = {
  themeColor: '#e6ecf0',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AnalyticsScript />
        <StructuredData />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
