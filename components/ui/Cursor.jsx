'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(!!e.target.closest?.('a,button,[data-cursor]'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!on) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 bg-mint" />
      </motion.div>
      <motion.div aria-hidden style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className={`-ml-5 -mt-5 h-10 w-10 rounded-full border transition-[transform,background-color,border-color] duration-200 ease-out ${hot ? 'scale-[1.6] border-mint bg-mint/10' : 'scale-100 border-white/40'}`} />
      </motion.div>
    </>
  );
}
