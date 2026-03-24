import { AnalyticsScript, StructuredData } from './AnalyticsScript';
import { ClientLayout } from './ClientLayout';
import './globals.css';

export const metadata = {
  title: 'Health Decoded - Empowering Youth Through Health Education',
  description: 'Building an international community of youth using health education to change the world. We provide health literacy workshops, peer ambassador programs, and educational resources for students.',
  keywords: 'health education, health literacy, youth education, health workshops, peer ambassadors, health advocacy, student health, medical education',
  authors: [{ name: 'Health Decoded Initiative' }],
  openGraph: {
    type: 'website',
    url: 'https://healthdecodedinitiative.org/',
    title: 'Health Decoded - Empowering Youth Through Health Education',
    description: 'Building an international community of youth using health education to change the world. We provide health literacy workshops, peer ambassador programs, and educational resources for students.',
    siteName: 'Health Decoded',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Decoded - Empowering Youth Through Health Education',
    description: 'Building an international community of youth using health education to change the world.',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
  manifest: '/manifest.json',
  metadataBase: new URL('https://healthdecodedinitiative.org'),
};

export const viewport = {
  themeColor: '#4F62F8',
};

export default function RootLayout({ children }) {
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
