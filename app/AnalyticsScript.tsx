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

export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Health Decoded',
    alternateName: 'Health Decoded Initiative',
    url: 'https://healthdecodedinitiative.org',
    logo: 'https://healthdecodedinitiative.org/logo512.png',
    description: 'Building an international community of youth using health education to change the world.',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
