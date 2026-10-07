'use client';

import Button from './Button';
import Magnetic from './Magnetic';
import { APP_URL } from '@/lib/content';

export default function DownloadBand() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em] md:col-span-8">Your first payout is a few tasks away.</h2>
        <div className="md:col-span-4 md:justify-self-end"><Magnetic><Button href={APP_URL}>Download App</Button></Magnetic></div>
      </div>
    </section>
  );
}
