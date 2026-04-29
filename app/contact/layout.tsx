// Minimal layout for the /contact route: exists solely to attach the page-level "Contact" metadata title without adding extra DOM wrappers.
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Contact - Health Decoded',
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
