// Catch-all 404 page with the structural design style.
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - Health Decoded',
};

export default function NotFound() {
  return (
    <div className="nf-page">
      <p className="nf-num" aria-hidden="true">404</p>
      <h1 className="nf-title">Page Not Found</h1>
      <p className="nf-body">
        We couldn&apos;t find the page you were looking for. It might have been
        moved or doesn&apos;t exist.
      </p>
      <Link href="/" className="nf-btn">
        Return Home →
      </Link>
    </div>
  );
}
