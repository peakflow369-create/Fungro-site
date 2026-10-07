import { Young_Serif, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import SceneClient from '@/components/canvas/SceneClient';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Cursor from '@/components/ui/Cursor';
import SmoothScroll from '@/components/ui/SmoothScroll';

const display = Young_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Funngro: earn money online as a teenager in India',
  description: 'Verified brand campaigns, instant UPI payouts and zero upfront investment for teen freelancers in India.',
};

export const viewport = { themeColor: '#080E0B' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-void font-sans text-white">
        <SmoothScroll />
        <Cursor />
        <SceneClient />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
