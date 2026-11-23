import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/content';

const HeroLaptop = lazy(() => import('./HeroLaptop'));

const FALLBACK_H =
  'flex h-[300px] items-center justify-center rounded-[1.15rem] bg-[#0B1220] font-mono text-sm text-signal-bright sm:h-[380px] lg:h-[460px]';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center pt-20 sm:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-16">
        <div>
          <motion.p
            className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-signal"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {profile.availability}
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.05 }}
          >
            {profile.name}
            <span className="mt-3 block text-2xl font-bold text-ink-soft sm:text-3xl lg:text-4xl">
              {profile.headline}
            </span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.1 }}
          >
            {profile.subhead}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.15 }}
          >
            <a
              href="#work"
              className="rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-signal-bright"
            >
              Explore agent pipelines
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-signal hover:text-signal"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-[1.5rem] border border-line/80 bg-ink p-2 shadow-[0_30px_80px_-40px_rgba(11,18,32,0.65)]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.12 }}
        >
          <Suspense fallback={<div className={FALLBACK_H}>Loading orchestration core…</div>}>
            <HeroLaptop />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
