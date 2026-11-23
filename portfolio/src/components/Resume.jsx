import { useState } from 'react';
import { profile } from '../data/content';

export default function Resume() {
  const [isViewing, setIsViewing] = useState(false);

  return (
    <section id="resume" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Resume</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Download or preview
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={profile.resumePath}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-signal"
          >
            Download PDF
          </a>
          <button
            type="button"
            onClick={() => setIsViewing((v) => !v)}
            className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-signal hover:text-signal"
          >
            {isViewing ? 'Hide preview' : 'View resume'}
          </button>
        </div>

        {isViewing ? (
          <iframe
            src={profile.resumePath}
            title="Ashwin Sanjaye resume"
            className="mt-6 h-[70vh] w-full rounded-2xl border border-line bg-surface shadow-sm"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsViewing(true)}
            className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-surface/70 px-8 py-14 text-center transition hover:border-signal hover:bg-surface"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
              PDF preview
            </span>
            <span className="text-sm text-slate">Click to view the resume inline</span>
          </button>
        )}
      </div>
    </section>
  );
}
