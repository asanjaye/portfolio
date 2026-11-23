import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
          {experience.title}
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            {experience.summary}
          </h2>
          <ul className="space-y-3 rounded-2xl border border-line bg-surface/80 p-6 shadow-sm">
            {experience.focus.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
