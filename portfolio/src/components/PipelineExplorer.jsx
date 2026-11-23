import { useMemo, useState } from 'react';
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

function PipelineGraph({ nodes, activeId, onSelect, reduce }) {
  const width = 920;
  const height = 168;
  const padding = 56;
  const step = nodes.length > 1 ? (width - padding * 2) / (nodes.length - 1) : 0;

  const points = nodes.map((node, i) => ({
    ...node,
    x: padding + i * step,
    y: height / 2 + (i % 2 === 0 ? -18 : 18),
  }));

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[640px] w-full"
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
          const active = node.id === activeId;
          const fill =
            node.kind === 'human' ? '#ffedd5' : node.kind === 'ai' ? '#ccfbf1' : '#ffffff';
          const stroke =
            node.kind === 'human' ? '#c2410c' : node.kind === 'ai' ? '#0f766e' : '#94a3b8';
          return (
            <g key={node.id} className="cursor-pointer" onClick={() => onSelect(node.id)}>
              <circle
                cx={node.x}
                cy={node.y}
                r={active ? 18 : 14}
                fill={fill}
                stroke={stroke}
                strokeWidth={active ? 3 : 2}
              />
              <text
                x={node.x}
                y={node.y + 42}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}
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
  const [activePipelineId, setActivePipelineId] = useState(pipelines[0].id);
  const active = useMemo(
    () => pipelines.find((p) => p.id === activePipelineId) ?? pipelines[0],
    [activePipelineId]
  );
  const [activeNodeId, setActiveNodeId] = useState(active.nodes[0].id);

  const activeNode =
    active.nodes.find((n) => n.id === activeNodeId) ?? active.nodes[0];

  const selectPipeline = (id) => {
    const next = pipelines.find((p) => p.id === id) ?? pipelines[0];
    setActivePipelineId(next.id);
    setActiveNodeId(next.nodes[0].id);
  };

  const step = (dir) => {
    const idx = active.nodes.findIndex((n) => n.id === activeNodeId);
    const next = active.nodes[(idx + dir + active.nodes.length) % active.nodes.length];
    setActiveNodeId(next.id);
  };

  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            AI automation
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Walk the agent pipelines
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
            Four demo systems built on synthetic data with evals and tests — not client
            engagements. Select a workflow, then step node by node through intake, model
            decisions, and human approval gates.
          </p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="AI automation case studies"
        >
          {pipelines.map((p) => {
            const selected = p.id === active.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectPipeline(p.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-surface text-slate hover:border-signal hover:text-signal'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)]">
          <div className="border-b border-line px-5 py-5 sm:px-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{active.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted">{active.meta}</p>
                <p className="mt-2 text-sm text-slate sm:text-base">{active.tagline}</p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Code and demo walkthrough available on request
              </p>
            </div>
          </div>

          <div className="border-b border-line bg-paper/60 px-3 py-5 sm:px-5">
            <PipelineGraph
              nodes={active.nodes}
              activeId={activeNode.id}
              onSelect={setActiveNodeId}
              reduce={reduce}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex flex-wrap gap-2">
                {Object.entries(kindLabel).map(([kind, label]) => (
                  <span
                    key={kind}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${kindStyles[kind]}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink hover:border-signal"
                >
                  Prev node
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="rounded-full bg-signal px-3 py-1.5 text-sm font-semibold text-white hover:bg-signal-bright"
                >
                  Next node
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-${activeNode.id}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                  Active node · {kindLabel[activeNode.kind]}
                </p>
                <h4 className="mt-2 font-display text-xl font-bold text-ink">
                  {activeNode.label}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
                  {activeNode.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid gap-5 p-5 sm:p-7 sm:grid-cols-2">
              <Detail label="Problem" text={active.problem} />
              <Detail label="What it does" text={active.does} />
              <Detail label="Architecture" text={active.architecture} />
              <Detail label="Human-in-the-loop" text={active.safety} />
              <div className="sm:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-signal/20 bg-signal/5 px-3 py-1 text-xs font-medium text-signal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 font-mono text-xs text-muted">{active.eval}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate">
          Hire me for AI automation — reach out via the{' '}
          <a href="#contact" className="font-semibold text-signal hover:underline">
            contact form
          </a>{' '}
          or <span className="font-semibold text-ink">sanjaye@usc.edu</span>.
        </p>
      </div>
    </section>
  );
}

function Detail({ label, text }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
    </div>
  );
}
