// Redirect shim: /about has no content of its own — it immediately forwards visitors to /about/us so all three subnav tabs start from a consistent URL.
import { redirect } from 'next/navigation';

export default function AboutPage() {
  redirect('/about/us/');
}
