'use client';

import Button from './Button';
import Magnetic from './Magnetic';
import { BRAND_URL } from '@/lib/content';

export default function BrandBanner() {
  return (
    <section id="brands" className="relative z-10 bg-mint px-5 py-24 text-void md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <h2 className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.05em] md:col-span-8">Post a campaign. Hire Gen-Z talent.</h2>
        <div className="flex flex-col justify-end gap-8 md:col-span-4">
          <p className="max-w-[34ch] text-lg leading-snug">5,000+ brands already brief teen freelancers on Funngro. Share what you need and get work back from creators who know your audience.</p>
          <div className="flex flex-wrap gap-3">
            <Magnetic><Button href={BRAND_URL} variant="dark">Post a campaign</Button></Magnetic>
            <Magnetic><Button href={BRAND_URL} variant="dark">Talk to our team</Button></Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
