// Server-rendered head components: AnalyticsScript injects the gtag.js snippet, StructuredData emits schema.org JSON-LD — both must live inside <head> via layout.tsx.
export function AnalyticsScript() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TQC31DXKBN"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQC31DXKBN');
          `,
        }}
      />
    </>
  );
}

const SITE_ORIGIN = 'https://healthdecodedinitiative.org';

export function StructuredData() {
  /** @graph ties WebSite → publisher Organization so Google can separate this entity from unrelated "Health Decoded" properties (BBC, podcasts, etc.). */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: 'Health Decoded Initiative',
        alternateName: 'Health Decoded',
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Health Decoded Initiative',
        alternateName: 'Health Decoded',
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/logo512.png`,
        image: `${SITE_ORIGIN}/og-image.jpg`,
        description:
          'Building an international community of youth using health education to change the world.',
        email: 'kartikn@healthdecodedinitiative.org',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New Brunswick',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        sameAs: ['https://linktr.ee/healthdecodedinit'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'kartikn@healthdecodedinitiative.org',
          contactType: 'General Inquiry',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
