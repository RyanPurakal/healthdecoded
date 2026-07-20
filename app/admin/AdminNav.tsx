'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/registrations', label: 'Registrations' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/deletion-requests', label: 'Deletion Requests' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="hd-app-nav">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? 'active' : ''}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
