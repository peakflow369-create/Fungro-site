'use client';

import Link from 'next/link';

const base = 'group/btn relative inline-flex items-center justify-center overflow-hidden rounded-[3px] px-6 py-3.5 text-[15px] font-semibold tracking-tight';
const variants = {
  solid: 'bg-mint text-void',
  line: 'stroke-reveal border border-white/25 text-white',
  dark: 'bg-void text-white',
};

export default function Button({ href = '#', variant = 'solid', className = '', children, ...props }) {
  const Comp = href.startsWith('/') ? Link : 'a';
  return (
    <Comp href={href} data-cursor className={`${base} ${variants[variant]} ${className}`} {...props}>
      {variant !== 'line' && (
        <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] group-hover/btn:scale-y-100" />
      )}
      <span className={`relative z-10 transition-colors duration-300 ${variant === 'dark' ? 'group-hover/btn:text-void' : ''}`}>{children}</span>
    </Comp>
  );
}
