import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { pipelines } from '../data/content';

const kindStyles = {
  ai: 'border-signal/40 bg-signal/10 text-signal',
  human: 'border-gate/40 bg-gate-soft text-gate',
  logic: 'border-line bg-paper text-ink-soft',
  io: 'border-line bg-surface text-slate',
};

const kindLabel = {
  ai: 'AI',
  human: 'Human',
  logic: 'Logic',
  io: 'I/O',
};

const carouselLabels = [
  '01 Lead-to-CRM',
  '02 Document Q&A',
  '03 Inbox Triage',
  '04 Clearfile Intake',
];

function PipelineGraph({ nodes, activeId, onSelect, reduce }) {
  const width = 920;
  const height = 108;
  const padding = 44;
  const step = nodes.length > 1 ? (width - padding * 2) / (nodes.length - 1) : 0;

  const points = nodes.map((node, i) => ({
    ...node,
    x: padding + i * step,
    y: height / 2 + (i % 2 === 0 ? -10 : 10),
  }));

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[520px] w-full"
        role="img"
        aria-label="Agent workflow pipeline"
      >
        {points.slice(0, -1).map((p, i) => {
          const n = points[i + 1];
          return (
            <path
              key={`${p.id}-${n.id}`}
              d={`M ${p.x} ${p.y} C ${(p.x + n.x) / 2} ${p.y}, ${(p.x + n.x) / 2} ${n.y}, ${n.x} ${n.y}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray={reduce ? undefined : '6 8'}
            >
              {!reduce && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="28"
                  to="0"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          );
        })}

        {points.map((node) => {
          const selected = node.id === activeId;
          const fill =
            node.kind === 'human' ? '#ffedd5' : node.kind === 'ai' ? '#ccfbf1' : '#ffffff';
          const stroke =
            node.kind === 'human' ? '#c2410c' : node.kind === 'ai' ? '#0f766e' : '#94a3b8';
          return (
            <g key={node.id} className="cursor-pointer" onClick={() => onSelect(node.id)}>
              <circle
                cx={node.x}
                cy={node.y}
                r={selected ? 13 : 10}
                fill={fill}
                stroke={stroke}
                strokeWidth={selected ? 3 : 2}
              />
              <text
                x={node.x}
                y={node.y + 28}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function PipelineExplorer() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const active = pipelines[index] ?? pipelines[0];
  const [activeNodeId, setActiveNodeId] = useState(active.nodes[0].id);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);
  const controlsRef = useRef(null);

  const activeNode =
    active.nodes.find((n) => n.id === activeNodeId) ?? active.nodes[0];

  const goTo = useCallback((nextIndex, dir = 0) => {
    setIndex((current) => {
      const wrapped = (nextIndex + pipelines.length) % pipelines.length;
      setDirection(dir || (wrapped > current ? 1 : -1));
      setActiveNodeId(pipelines[wrapped].nodes[0].id);
      return wrapped;
    });
  }, []);

  const goPrev = useCallback(() => {
    setIndex((current) => {
      const wrapped = (current - 1 + pipelines.length) % pipelines.length;
      setDirection(-1);
      setActiveNodeId(pipelines[wrapped].nodes[0].id);
      return wrapped;
    });
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => {
      const wrapped = (current + 1) % pipelines.length;
      setDirection(1);
      setActiveNodeId(pipelines[wrapped].nodes[0].id);
      return wrapped;
    });
  }, []);

  const stepNode = (dir) => {
    const idx = active.nodes.findIndex((n) => n.id === activeNodeId);
    const next = active.nodes[(idx + dir + active.nodes.length) % active.nodes.length];
    setActiveNodeId(next.id);
  };

  useEffect(() => {
    const onKey = (e) => {
      const root = controlsRef.current;
      if (!root) return;
      if (!root.contains(document.activeElement) && document.activeElement !== root) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const slideVariants = useMemo(
    () => ({
      enter: (dir) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? 28 : -28 }),
      center: { opacity: 1, x: 0 },
      exit: (dir) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? -22 : 22 }),
    }),
    [reduce]
  );

  return (
    <section id="work" className="scroll-mt-16 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              AI automation
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Walk the agent pipelines
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate sm:text-sm">
            Demo systems on synthetic data. Switch projects in-place — no scrolling up and down.
          </p>
        </div>

        <div
          ref={controlsRef}
          tabIndex={0}
          className="mt-4 rounded-[1.25rem] border border-line bg-surface shadow-[0_20px_50px_-36px_rgba(15,23,42,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-signal"
          aria-roledescription="carousel"
          aria-label="AI automation project carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 sm:px-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm text-ink transition hover:border-signal hover:text-signal"
            >
              ←
            </button>

            <div
              className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto"
              role="tablist"
              aria-label="Project slides"
            >
              {pipelines.map((p, i) => {
                const selected = i === index;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`pipeline-slide-${p.id}`}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-wide transition sm:px-3 sm:text-[11px] ${
                      selected
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line bg-paper text-slate hover:border-signal hover:text-signal'
                    }`}
                  >
                    {carouselLabels[i]}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm text-ink transition hover:border-signal hover:text-signal"
            >
              →
            </button>

            <p className="shrink-0 font-mono text-[11px] text-muted" aria-live="polite">
              {index + 1} / {pipelines.length}
            </p>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                id={`pipeline-slide-${active.id}`}
                role="tabpanel"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.01 : 0.25, ease: 'easeOut' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                      {active.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] text-muted sm:text-[11px]">
                      {active.meta}
                    </p>
                    <p className="mt-1 text-xs text-slate sm:text-sm">{active.tagline}</p>
                  </div>
                  {active.githubUrl ? (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${active.title} on GitHub`}
                      className="inline-flex items-center rounded-full border border-ink bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper transition hover:bg-signal sm:text-sm"
                    >
                      View on GitHub
                    </a>
                  ) : null}
                </div>

                <div className="border-b border-line bg-paper/60 px-2 py-2.5 sm:px-4">
                  <PipelineGraph
                    nodes={active.nodes}
                    activeId={activeNode.id}
                    onSelect={setActiveNodeId}
                    reduce={reduce}
                  />
                  <div className="mt-0.5 flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(kindLabel).map(([kind, label]) => (
                        <span
                          key={kind}
                          className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${kindStyles[kind]}`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => stepNode(-1)}
                        className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] text-ink hover:border-signal"
                      >
                        Prev node
                      </button>
                      <button
                        type="button"
                        onClick={() => stepNode(1)}
                        className="rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-semibold text-white hover:bg-signal-bright"
                      >
                        Next node
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="border-b border-line p-3 sm:p-4 lg:border-b-0 lg:border-r">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                      Active node · {kindLabel[activeNode.kind]}
                    </p>
                    <h4 className="mt-1 font-display text-base font-bold text-ink">
                      {activeNode.label}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate sm:text-sm">
                      {activeNode.detail}
                    </p>
                  </div>

                  <div className="grid gap-2.5 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4">
                    <Detail label="Problem" text={active.problem} />
                    <Detail label="What it does" text={active.does} />
                    <Detail label="Architecture" text={active.architecture} />
                    <Detail label="Human-in-the-loop" text={active.safety} />
                    <div className="sm:col-span-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Stack
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {active.stack.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-signal/20 bg-signal/5 px-2 py-0.5 text-[10px] font-medium text-signal"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-1.5 font-mono text-[10px] text-muted">{active.eval}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-1.5 border-t border-line px-3 py-2">
            {pipelines.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${carouselLabels[i]}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-signal' : 'w-1.5 bg-line hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, text }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-0.5 line-clamp-3 text-[11px] leading-relaxed text-slate sm:text-xs">
        {text}
      </p>
    </div>
  );
}
