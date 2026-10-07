import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-void px-5 py-10 md:px-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <p className="font-display text-4xl tracking-[-0.04em]">funngro</p>
        <nav className="flex gap-6 text-sm text-moss">
          <Link href="/" className="hover:text-mint">Earn</Link>
          <Link href="/about" className="hover:text-mint">About</Link>
          <Link href="/about#brands" className="hover:text-mint">For brands</Link>
        </nav>
      </div>
      <p className="mt-8 text-xs text-moss">© 2026 Funngro. Built for India's Gen-Z.</p>
    </footer>
  );
}
