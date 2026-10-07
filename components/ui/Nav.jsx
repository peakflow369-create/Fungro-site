'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import Magnetic from './Magnetic';
import { APP_URL } from '@/lib/content';

const links = [
  { href: '/', label: 'Earn' },
  { href: '/about', label: 'About' },
  { href: '/about#brands', label: 'For brands', hideOnMobile: true },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-void px-5 py-3 md:px-10">
      <Link href="/" data-cursor className="font-display text-2xl tracking-[-0.04em]">funngro</Link>
      <nav className="flex items-center gap-5 md:gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-cursor
            className={`text-sm transition-colors hover:text-mint ${l.hideOnMobile ? 'hidden sm:inline' : ''} ${path === l.href ? 'text-white underline decoration-mint decoration-2 underline-offset-8' : 'text-moss'}`}
          >
            {l.label}
          </Link>
        ))}
        <Magnetic strength={0.25}>
          <Button href={APP_URL} className="!px-4 !py-2 !text-sm">Download App</Button>
        </Magnetic>
      </nav>
    </header>
  );
}
