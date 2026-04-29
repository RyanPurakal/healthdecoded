// Google Analytics helpers: pageview() is called on every client-side route change in ClientLayout; event() can be imported anywhere to track custom interactions.
// Override the hardcoded tracking ID by setting NEXT_PUBLIC_GA_TRACKING_ID in your environment.

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-TQC31DXKBN';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname + window.location.search,
    });
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
