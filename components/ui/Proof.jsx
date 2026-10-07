'use client';

import { useRef } from 'react';
import { testimonials } from '@/lib/content';

export default function Proof() {
  const scroller = useRef(null);
  const nudge = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="relative h-56 w-56">
            <svg viewBox="0 0 200 200" className="absolute inset-0 animate-ring-spin text-mint" role="img" aria-label="Featured on Shark Tank India Season 2">
              <defs><path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text fill="currentColor" fontSize="12" fontWeight="600" textLength="486" lengthAdjust="spacing">
                <textPath href="#ring">Featured on Shark Tank India Season 2 • Backed by Amit Jain and Namita Thapar • </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-display text-5xl tracking-[-0.04em]">S2</p>
                <p className="text-xs text-moss">Shark Tank India</p>
              </div>
            </div>
          </div>
          <h2 className="mt-10 max-w-[12ch] font-display text-4xl leading-[0.98] tracking-[-0.035em] md:text-5xl">Seen on Shark Tank India</h2>
          <p className="mt-4 max-w-[36ch] text-moss">Funngro took a deal in Season 2 and has grown with its members since.</p>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-moss">What members say</p>
            <div className="flex gap-2">
              <button onClick={() => nudge(-1)} aria-label="Previous" data-cursor className="stroke-reveal grid h-11 w-11 place-items-center border border-line text-xl">‹</button>
              <button onClick={() => nudge(1)} aria-label="Next" data-cursor className="stroke-reveal grid h-11 w-11 place-items-center border border-line text-xl">›</button>
            </div>
          </div>
          <div ref={scroller} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-6 md:mx-0 md:px-0">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-cursor
                className={`stroke-reveal flex min-h-[300px] w-[78vw] shrink-0 snap-start flex-col justify-between rounded-md border border-line bg-surface p-6 sm:w-[340px] ${i % 2 ? 'sm:mt-10' : ''}`}
              >
                <blockquote className="font-display text-2xl leading-[1.15] tracking-[-0.02em]">“{t.quote}”</blockquote>
                <figcaption className="mt-8 text-sm"><span className="text-white">{t.name}</span> <span className="text-moss">{t.meta}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
