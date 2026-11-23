import { about } from '../data/content';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">About</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Systems that decide — with a human in the loop
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-slate sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(about.skills).map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-line bg-surface/80 p-5 shadow-sm"
            >
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                {category}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {items.map((skill) => (
                  <li key={skill} className="text-sm text-ink-soft">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
