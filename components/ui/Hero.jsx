'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from './Button';
import Magnetic from './Magnetic';
import { APP_URL } from '@/lib/content';

const words = 'Earn Money Online & Freelance as a Teenager in India'.split(' ');
const ease = [0.2, 0.9, 0.2, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-16">
      <div className="md:max-w-[60%]">
        <h1 className="font-display text-[clamp(2.6rem,6.3vw,6.6rem)] leading-[0.94] tracking-[-0.045em]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.1em] align-top">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-[46ch] text-lg leading-snug text-white/75 md:text-xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Join 70 Lakh+ young Indians building real experience with verified brand campaigns. Instant UPI payouts with zero upfront investment.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <Magnetic><Button href={APP_URL}>Download App</Button></Magnetic>
          <Magnetic><Button href="#ways" variant="line">Explore Projects</Button></Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
