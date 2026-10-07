'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.2, 0.9, 0.2, 1];
const facts = [
  ['Founded', '2022'],
  ['Backed by', 'Amit Jain and Namita Thapar'],
  ['Profitable', '10 of 12 months'],
];

export default function AboutHero() {
  const reduce = useReducedMotion();
  return (
    <section className="flex min-h-[100svh] flex-col justify-end px-5 pb-14 pt-32 md:px-10 md:pb-20">
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="max-w-[16ch] font-display text-[clamp(2.6rem,7.4vw,8rem)] leading-[0.93] tracking-[-0.045em]"
      >
        Empowering Gen-Z Talent &amp; Connecting Brands with Teen Freelancers
      </motion.h1>

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <p className="max-w-[52ch] text-xl leading-snug text-white/80 md:col-span-6 md:col-start-6">
          Funngro was founded in 2022 by Payal Jain and Anik Jain, both IIM alumni, to democratize youth work in India. Brands post real campaigns. Teenagers across the country pick them up, deliver, and get paid by UPI.
        </p>
        <dl className="grid grid-cols-3 gap-px bg-line md:col-span-12">
          {facts.map(([k, v]) => (
            <div key={k} className="bg-void py-4 pr-4">
              <dt className="text-sm text-moss">{k}</dt>
              <dd className="mt-1 font-display text-xl tracking-[-0.02em] md:text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
