'use client';

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import StatusDot from './StatusDot';
import { stages, tasks } from '@/lib/content';

/* Pointer-driven 3D tilt shared by every card (mouse only). */
function Tilt({ children, className = '' }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });
  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`stroke-reveal rounded-md border border-line bg-surface p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Card 1: hover (or tap) plays a mock timeline edit */
const tracks = [
  { label: 'Video', clips: [[0, 30], [32, 28], [62, 36]] },
  { label: 'Audio', clips: [[0, 52], [54, 44]] },
  { label: 'Text', clips: [[10, 18], [44, 22], [78, 18]] },
];

function EditCard() {
  const [on, setOn] = useState(false);
  return (
    <Tilt className="lg:col-span-7">
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setOn(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setOn(false)}
        onPointerDown={(e) => e.pointerType !== 'mouse' && setOn((v) => !v)}
        data-cursor
      >
        <h3 className="max-w-[16ch] font-display text-3xl leading-[1] tracking-[-0.03em] md:text-4xl">Content creation and video editing</h3>
        <p className="mt-3 max-w-[44ch] text-moss">Cut reels, shoot product clips and edit for real brand campaigns.</p>

        <div className="mt-8 border border-line bg-void p-3">
          <div className="relative mb-3 flex aspect-[16/7] items-end justify-between overflow-hidden bg-[#0d1712] p-3 text-sm">
            <span className="text-white/80">Brand reel</span>
            <span className="flex items-center gap-2 text-moss">
              {on && <StatusDot />}
              {on ? 'Playing' : 'Hover or tap to preview'}
            </span>
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-mint transition-transform ease-linear ${on ? 'scale-x-100 duration-[2400ms]' : 'scale-x-0 duration-300'}`}
            />
          </div>

          <div className="relative">
            {tracks.map((t) => (
              <div key={t.label} className="relative mb-1.5 h-7 last:mb-0">
                {t.clips.map(([s, w]) => (
                  <span
                    key={s}
                    style={{ left: `${s}%`, width: `${w}%`, '--d': `${(s / 100) * 2.4}s` }}
                    className={`absolute top-0 h-full rounded-[2px] border border-mint/40 transition-colors duration-200 ${on ? 'bg-mint [transition-delay:var(--d)]' : 'bg-mint/15 [transition-delay:0s]'}`}
                  />
                ))}
              </div>
            ))}
            <span
              className={`absolute -top-1 bottom-0 w-px bg-white transition-[left] ease-linear ${on ? 'left-full duration-[2400ms]' : 'left-0 duration-300'}`}
            />
          </div>
        </div>
      </div>
    </Tilt>
  );
}

/* Card 2: tick sample tasks, watch the total */
function TaskCard() {
  const [done, setDone] = useState({});
  const total = tasks.reduce((s, t) => s + (done[t.id] ? t.pay : 0), 0);
  return (
    <Tilt className="lg:col-span-5">
      <h3 className="max-w-[14ch] font-display text-3xl leading-[1] tracking-[-0.03em] md:text-4xl">Micro-tasks and surveys</h3>
      <p className="mt-3 text-moss">Brand promotions, app testing, quick surveys. Finish one between classes.</p>

      <ul className="mt-6 border-t border-line">
        {tasks.map((t) => {
          const d = !!done[t.id];
          return (
            <li key={t.id}>
              <button
                role="checkbox"
                aria-checked={d}
                onClick={() => setDone((s) => ({ ...s, [t.id]: !s[t.id] }))}
                data-cursor
                className="flex w-full items-center gap-4 border-b border-line py-3.5 text-left"
              >
                <span className={`grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-150 ${d ? 'border-mint bg-mint' : 'border-moss'}`}>
                  {d && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-void" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M2 6.5l2.6 2.5L10 3.5" /></svg>
                  )}
                </span>
                <span className="flex-1">
                  <span className={`block transition-colors ${d ? 'text-white/50 line-through' : ''}`}>{t.title}</span>
                  <span className="block text-sm text-moss">{t.meta}</span>
                </span>
                <span className="tabular-nums">₹{t.pay}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-baseline justify-between text-sm text-moss">
        <span>Sample tasks</span>
        <span>
          Earned <motion.span key={total} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-display text-2xl text-white">₹{total}</motion.span>
        </span>
      </div>
    </Tilt>
  );
}

/* Card 3: the income ladder is a real sequence, so Stage 01-03 numbering stays */
const heights = ['h-24', 'h-40', 'h-56'];

function LadderCard() {
  const [active, setActive] = useState(0);
  const s = stages[active];
  return (
    <Tilt className="lg:col-span-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h3 className="max-w-[14ch] font-display text-3xl leading-[1] tracking-[-0.03em] md:text-4xl">The income ladder</h3>
          <p className="mt-3 max-w-[40ch] text-moss">Every member starts at the bottom step. Pick a stage to see what it looks like.</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-display text-2xl">{s.range}</p>
            <p className="mt-2 max-w-[42ch] leading-relaxed text-white/75">{s.body}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-end gap-2 lg:col-span-7">
          {stages.map((st, i) => {
            const on = i === active;
            return (
              <button
                key={st.n}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor
                aria-pressed={on}
                className={`flex flex-col justify-end border p-4 text-left transition-[height,background-color,color,border-color] duration-300 ease-[cubic-bezier(.2,.9,.2,1)] ${heights[i]} ${on ? 'border-mint bg-mint text-void' : 'border-line bg-void text-white hover:border-moss'}`}
              >
                <span className={`text-sm ${on ? 'text-void/70' : 'text-moss'}`}>Stage {st.n}</span>
                <span className="font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">{st.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Tilt>
  );
}

export default function BentoGrid() {
  return (
    <section id="ways" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 grid gap-6 md:grid-cols-12">
        <h2 className="font-display text-[clamp(2.4rem,5.4vw,5.5rem)] leading-[0.95] tracking-[-0.04em] md:col-span-8">Start with a task. Grow into a business.</h2>
        <p className="self-end text-moss md:col-span-3 md:col-start-10">Pick the kind of work that fits your week. Every project comes from a verified brand and pays out by UPI.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
        <EditCard />
        <TaskCard />
        <LadderCard />
      </div>
    </section>
  );
}
