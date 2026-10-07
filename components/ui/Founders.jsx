import { founders } from '@/lib/content';

export default function Founders() {
  return (
    <section className="border-t border-line px-5 py-28 md:px-10 md:py-40">
      <h2 className="mb-16 max-w-[12ch] font-display text-[clamp(2.4rem,5vw,5rem)] leading-[0.96] tracking-[-0.04em]">The people behind Funngro</h2>
      <div className="grid gap-12 md:grid-cols-2 md:gap-8">
        {founders.map((f, i) => (
          <article key={f.name} className={`group ${i === 1 ? 'md:mt-24' : ''}`}>
            <div className="flex aspect-[4/3] items-end border border-line bg-surface p-6 transition-colors duration-300 group-hover:border-mint">
              <span className="font-display text-[clamp(7rem,15vw,14rem)] leading-[0.8] tracking-[-0.06em] text-transparent transition-[-webkit-text-stroke-color] duration-300 [-webkit-text-stroke:1.5px_rgb(var(--c-moss))] group-hover:[-webkit-text-stroke-color:rgb(var(--c-mint))]">
                {f.initials}
              </span>
            </div>
            <h3 className="mt-6 font-display text-3xl tracking-[-0.03em]">{f.name}</h3>
            <p className="mt-1 text-moss">{f.role}</p>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-white/75">{f.bio}</p>
            <a href={f.linkedin} data-cursor className="mt-5 inline-block text-sm underline decoration-mint decoration-2 underline-offset-8 transition-colors hover:text-mint">
              {f.name.split(' ')[0]} on LinkedIn
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
