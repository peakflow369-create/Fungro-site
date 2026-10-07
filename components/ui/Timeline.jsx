'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/lib/content';

export default function Timeline() {
  const wrap = useRef(null);
  const fill = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.tl-item');
      if (reduce) {
        items.forEach((el) => el.classList.add('is-active'));
        gsap.set(fill.current, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 55%', end: 'bottom 65%', scrub: 0.4 } }
      );
      items.forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          onEnter: () => el.classList.add('is-active'),
          onLeaveBack: () => el.classList.remove('is-active'),
        })
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section className="grid gap-x-6 border-t border-line px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
      <div className="mb-16 self-start md:sticky md:top-28 md:col-span-4 md:mb-0">
        <h2 className="max-w-[10ch] font-display text-[clamp(2.4rem,4.6vw,4.8rem)] leading-[0.96] tracking-[-0.04em]">How we got here</h2>
        <p className="mt-4 max-w-[34ch] text-moss">From a first version in 2022 to 70 lakh+ young people earning on the app.</p>
      </div>

      <div ref={wrap} className="relative pl-8 md:col-span-8 md:pl-14">
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <span aria-hidden ref={fill} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-mint" />
        {timeline.map((t) => (
          <article key={t.year} className="tl-item relative pb-24 last:pb-0">
            <span aria-hidden className="tl-dot absolute -left-8 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-moss bg-void md:-left-14" />
            <p className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-[-0.05em]">{t.year}</p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">{t.title}</h3>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-white/70">{t.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
