// Catch-all 404 page shown by Next.js whenever no route matches; links back to the home page.
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Page Not Found - Health Decoded',
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center" style={{ padding: '4rem 1rem' }}>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-black mb-8 max-w-lg mx-auto">
        We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Button href="/">Return Home</Button>
    </div>
  );
}
