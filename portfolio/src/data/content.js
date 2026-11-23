export const profile = {
  name: 'Ashwin Sanjaye',
  shortName: 'Ashwin',
  email: 'sanjaye@usc.edu',
  linkedin: 'https://www.linkedin.com/in/ashwin-sanjaye',
  github: 'https://github.com/asanjaye',
  resumePath: '/Ashwin Sanjaye Resume March 2025.pdf',
  headline: 'AI agent & automation engineer',
  subhead:
    'I design human-in-the-loop AI workflows — lead intake, document Q&A, inbox triage, and document extraction — then ship them as reliable systems.',
  availability:
    'Available for freelance AI agent and automation work on Upwork and Contra.',
};

export const about = {
  paragraphs: [
    'I am a Computer Science and Business Administration student at USC with a focus on building AI-integrated software end to end. I care about systems that are useful in production: structured outputs, evals, audit logs, and clear human approval gates.',
    'I take business requirements and independently deliver full solutions — from workflow design and model integration to review UIs and deployment. Lately I have been building AI agent and automation demos and starting freelance work on Upwork and Contra.',
  ],
  skills: {
    Languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++'],
    'AI & Automation': ['LLMs', 'RAG', 'n8n', 'FastAPI', 'Evals'],
    Frontend: ['React', 'TypeScript', 'HTML/CSS', 'Three.js'],
    Backend: ['Node.js', 'Spring Boot', 'Flask', 'Express', 'PostgreSQL'],
  },
};

export const experience = {
  title: 'Experience',
  summary:
    'Two years building AI-integrated solutions end to end for companies across several industries. I take business requirements and independently deliver full-fledged systems — from architecture and model integration through interfaces, validation, and handoff.',
  focus: [
    'End-to-end ownership from requirements to shipped solution',
    'AI workflows with structured outputs, validation, and human approval',
    'Cross-industry delivery spanning ops, intake, and internal tooling',
  ],
};

export const pipelines = [
  {
    id: 'lead-crm',
    title: 'AI Lead-to-CRM Workflow',
    tagline: 'Webhook intake → classify → approve → CRM-ready draft',
    meta: 'Demo · synthetic leads · n8n + FastAPI',
    problem:
      'Inbound leads arrive unstructured and need triage before a human spends time on them.',
    does: 'Webhook lead intake with validation, LLM classification (hot/warm/cold/spam, intent, summary), spam filtering, and personalized reply drafts held for approval. Postgres audit logging and Slack failure alerts.',
    architecture:
      'n8n orchestrates the workflow; a FastAPI microservice handles LLM calls (OpenAI or Anthropic) with structured output and retries. 25 labeled synthetic leads, an eval script, and 24 unit tests.',
    safety:
      'Reply drafts stay in a human approval dashboard — nothing goes out without review. Failures alert via Slack.',
    stack: ['n8n', 'Python/FastAPI', 'PostgreSQL', 'Docker', 'OpenAI/Anthropic'],
    eval: '25 labeled synthetic leads · eval script · 24 unit tests',
    nodes: [
      { id: 'intake', label: 'Webhook intake', kind: 'io', detail: 'Lead payload arrives via webhook and is validated before processing.' },
      { id: 'validate', label: 'Validate', kind: 'logic', detail: 'Schema and field checks reject malformed or incomplete leads early.' },
      { id: 'classify', label: 'LLM classify', kind: 'ai', detail: 'FastAPI microservice classifies hot/warm/cold/spam, intent, and summary with structured output and retries.' },
      { id: 'spam', label: 'Spam filter', kind: 'logic', detail: 'Spam and low-value leads are filtered before draft generation.' },
      { id: 'draft', label: 'Reply draft', kind: 'ai', detail: 'Personalized reply draft is generated and held — not sent.' },
      { id: 'approve', label: 'Human approve', kind: 'human', detail: 'Approval dashboard records human review before any outbound action.' },
      { id: 'audit', label: 'Audit + alerts', kind: 'io', detail: 'Postgres audit log; Slack alerts on workflow failures.' },
    ],
  },
  {
    id: 'doc-qa',
    title: 'Document Q&A Assistant',
    tagline: 'Chunk → retrieve → cite → escalate when unsure',
    meta: 'Demo · synthetic Q&A · RAG with citations',
    problem:
      'Teams need answers from internal documents without hallucinated claims or silent failures on hard questions.',
    does: 'Section-aware chunking, local embeddings (sentence-transformers), ChromaDB retrieval with confidence scoring, and answers that cite source sections. Web UI, CLI, and FastAPI.',
    architecture:
      'RAG pipeline with local embeddings and ChromaDB. Confidence-based retrieval; out-of-scope and low-confidence questions escalate via webhook (n8n/Slack-compatible). 20-question eval set and 19 tests.',
    safety:
      'Citations keep answers grounded in source sections. Low-confidence and out-of-scope questions escalate for human handoff instead of forcing an answer.',
    stack: ['Python/FastAPI', 'RAG', 'ChromaDB', 'sentence-transformers', 'n8n'],
    eval: '20-question eval set · 19 tests',
    nodes: [
      { id: 'ingest', label: 'Ingest docs', kind: 'io', detail: 'Documents enter the system for indexing.' },
      { id: 'chunk', label: 'Section chunk', kind: 'logic', detail: 'Section-aware chunking preserves document structure for better citations.' },
      { id: 'embed', label: 'Local embed', kind: 'ai', detail: 'sentence-transformers embeddings stored in ChromaDB.' },
      { id: 'retrieve', label: 'Retrieve', kind: 'ai', detail: 'Confidence-based retrieval selects supporting sections.' },
      { id: 'answer', label: 'Answer + cite', kind: 'ai', detail: 'Response includes citations to source sections.' },
      { id: 'handoff', label: 'Human handoff', kind: 'human', detail: 'Out-of-scope or low-confidence questions escalate via webhook (n8n/Slack-compatible).' },
    ],
  },
  {
    id: 'inbox',
    title: 'AI Inbox Triage Agent',
    tagline: 'Classify → draft → hard approval gate → send',
    meta: 'Demo · synthetic emails · FastAPI + React',
    problem:
      'High email volume makes it hard to prioritize what needs a reply and what can wait.',
    does: 'Classifies emails (category, priority, needs-reply, summary) with an LLM, drafts replies, and exposes a review UI to edit and approve. Audit log plus a pluggable mail source with Gmail/IMAP/Outlook adapters.',
    architecture:
      'Python/FastAPI backend with a React review UI. Pluggable mail adapters. 40 labeled synthetic emails, an eval script, and 27 tests.',
    safety:
      'Hard human approval gate in code — nothing sends without a recorded approval, covered by tests.',
    stack: ['Python/FastAPI', 'React', 'LLM', 'Gmail/IMAP/Outlook'],
    eval: '40 labeled synthetic emails · eval script · 27 tests',
    nodes: [
      { id: 'mail', label: 'Mail source', kind: 'io', detail: 'Pluggable adapters for Gmail, IMAP, or Outlook.' },
      { id: 'triage', label: 'LLM triage', kind: 'ai', detail: 'Category, priority, needs-reply flag, and summary.' },
      { id: 'draft', label: 'Draft reply', kind: 'ai', detail: 'Reply draft generated for human review.' },
      { id: 'review', label: 'Review UI', kind: 'human', detail: 'React UI to edit, approve, or reject before any send.' },
      { id: 'gate', label: 'Approval gate', kind: 'human', detail: 'Hard gate in code: nothing sends without a recorded approval (tested).' },
      { id: 'audit', label: 'Audit log', kind: 'io', detail: 'Actions are logged for traceability.' },
    ],
  },
  {
    id: 'clearfile',
    title: 'Clearfile — AI Document Intake',
    tagline: 'Extract → validate → exception queue → export',
    meta: 'Demo · synthetic documents · Node/TypeScript',
    problem:
      'Invoices, purchase orders, and intake forms arrive as PDFs and images and need structured fields before ops can act.',
    does: 'Ingests PDF/image documents, extracts structured fields with an LLM (OpenAI/Anthropic), runs validation rules (e.g. line items vs totals, required fields), and flags exceptions into a human review queue with a side-by-side document/fields UI. Audit log, SQLite + CSV export, Google Sheets adapter.',
    architecture:
      'Node/TypeScript stack with Docker. LLM field extraction plus rule-based validation. 25 synthetic documents with ground-truth eval and 10 tests.',
    safety:
      'Validation exceptions land in a human review queue with side-by-side document and fields — automation stops short of silent write-through on bad extractions.',
    stack: ['Node/TypeScript', 'OpenAI/Anthropic', 'SQLite', 'Docker', 'Google Sheets'],
    eval: '25 synthetic documents · ground-truth eval · 10 tests',
    nodes: [
      { id: 'upload', label: 'PDF / image', kind: 'io', detail: 'Invoices, purchase orders, and intake forms as PDF or images.' },
      { id: 'extract', label: 'LLM extract', kind: 'ai', detail: 'Structured field extraction via OpenAI or Anthropic.' },
      { id: 'rules', label: 'Validate rules', kind: 'logic', detail: 'Checks such as line items vs totals and required fields.' },
      { id: 'queue', label: 'Exception queue', kind: 'human', detail: 'Side-by-side document and fields review for flagged exceptions.' },
      { id: 'export', label: 'Export', kind: 'io', detail: 'SQLite + CSV export and Google Sheets adapter.' },
      { id: 'audit', label: 'Audit log', kind: 'io', detail: 'Extraction and review actions recorded.' },
    ],
  },
];

export const contactCopy = {
  title: 'Let’s build a workflow',
  body: 'Hiring for AI automation — lead intake, document Q&A, inbox triage, or document extraction with human approval gates? Send a note or email directly.',
};
