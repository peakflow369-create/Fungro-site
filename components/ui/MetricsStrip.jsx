'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import StatusDot from './StatusDot';

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.2, 0.9, 0.2, 1], onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>;
}

const cells = [
  { value: <CountUp to={70} suffix="L+" />, label: 'Active users' },
  { value: '₹1K–₹15K+', label: 'Monthly income ladder' },
  { value: <CountUp to={5000} suffix="+" />, label: 'Brands posting campaigns' },
  { value: '<24h', label: 'UPI payouts', live: true },
];

export default function MetricsStrip() {
  return (
    <section aria-label="Funngro in numbers" className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
      {cells.map((c, i) => (
        <div key={i} className="bg-void px-5 py-8 md:px-10 md:py-12">
          <p className="font-display text-[clamp(2rem,4.2vw,4.4rem)] leading-none tracking-[-0.04em]">{c.value}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-moss">
            {c.live && <StatusDot />}
            {c.label}
          </p>
        </div>
      ))}
    </section>
  );
}
