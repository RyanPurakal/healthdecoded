// Google Analytics utility
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: window.location.pathname + window.location.search,
        });
    }
};

// Track page views
export const pageview = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Track events
export const event = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};


