import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';

const AutomationContainer = styled(Container)`
  text-align: center;
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 17px;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  letter-spacing: 0.3px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.card};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  gap: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const ProjectMeta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 0.5rem;
`;

const DetailBlock = styled.div`
  margin-bottom: 0.85rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.4px;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
`;

const DetailText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: 0.2px;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 15px;
  letter-spacing: 0.5px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}25`};
    transform: translateY(-2px);
  }
`;

const AvailabilityNote = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  font-style: italic;
  margin-top: 0.25rem;
`;

const HireBlurb = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.75rem 2rem;
  margin: 2.5rem auto 0;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  overflow: hidden;
  text-align: left;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    opacity: 0.8;
  }
`;

const HireTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const HireText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

function AIAutomation() {
  const projects = [
    {
      title: 'AI Lead-to-CRM Workflow',
      meta: 'Demo project · synthetic leads · n8n + FastAPI',
      problem:
        'Inbound leads arrive unstructured and need triage before a human spends time on them.',
      does:
        'Webhook lead intake with validation, LLM classification (hot/warm/cold/spam, intent, summary), spam filtering, and personalized reply drafts held for approval. Includes Postgres audit logging and Slack failure alerts.',
      architecture:
        'n8n orchestrates the workflow; a FastAPI microservice handles LLM calls (OpenAI or Anthropic) with structured output and retries. Postgres stores audit logs. 25 labeled synthetic leads, an eval script, and 24 unit tests.',
      safety:
        'Reply drafts stay in a human approval dashboard — nothing goes out without review. Failures alert via Slack.',
      tech: ['n8n', 'Python/FastAPI', 'PostgreSQL', 'Docker', 'OpenAI/Anthropic'],
    },
    {
      title: 'Document Q&A Assistant',
      meta: 'Demo project · synthetic Q&A set · RAG with citations',
      problem:
        'Teams need answers from internal documents without hallucinated claims or silent failures on hard questions.',
      does:
        'Section-aware chunking, local embeddings (sentence-transformers), ChromaDB retrieval with confidence scoring, and answers that cite source sections. Web UI, CLI, and FastAPI.',
      architecture:
        'RAG pipeline with local embeddings and ChromaDB. Confidence-based retrieval; out-of-scope and low-confidence questions escalate via webhook (n8n/Slack-compatible). 20-question eval set and 19 tests.',
      safety:
        'Citations keep answers grounded in source sections. Low-confidence and out-of-scope questions escalate for human handoff instead of forcing an answer.',
      tech: ['Python/FastAPI', 'RAG', 'ChromaDB', 'sentence-transformers', 'n8n'],
    },
    {
      title: 'AI Inbox Triage Agent',
      meta: 'Demo project · synthetic emails · FastAPI + React',
      problem:
        'High email volume makes it hard to prioritize what needs a reply and what can wait.',
      does:
        'Classifies emails (category, priority, needs-reply, summary) with an LLM, drafts replies, and exposes a review UI to edit and approve. Audit log plus a pluggable mail source with Gmail/IMAP/Outlook adapters.',
      architecture:
        'Python/FastAPI backend with a React review UI. Pluggable mail adapters. 40 labeled synthetic emails, an eval script, and 27 tests.',
      safety:
        'Hard human approval gate in code — nothing sends without a recorded approval, covered by tests.',
      tech: ['Python/FastAPI', 'React', 'LLM', 'Gmail/IMAP/Outlook'],
    },
    {
      title: 'Clearfile — AI Document Intake',
      meta: 'Demo project · synthetic documents · Node/TypeScript',
      problem:
        'Invoices, purchase orders, and intake forms arrive as PDFs and images and need structured fields before ops can act.',
      does:
        'Ingests PDF/image documents, extracts structured fields with an LLM (OpenAI/Anthropic), runs validation rules (e.g. line items vs totals, required fields), and flags exceptions into a human review queue with a side-by-side document/fields UI. Audit log, SQLite + CSV export, Google Sheets adapter.',
      architecture:
        'Node/TypeScript stack with Docker. LLM field extraction plus rule-based validation. 25 synthetic documents with ground-truth eval and 10 tests.',
      safety:
        'Validation exceptions land in a human review queue with side-by-side document and fields — automation stops short of silent write-through on bad extractions.',
      tech: ['Node/TypeScript', 'OpenAI/Anthropic', 'SQLite', 'Docker', 'Google Sheets'],
    },
  ];

  return (
    <AutomationContainer>
      <SectionTitle>AI Automation</SectionTitle>
      <Intro>
        Demo case studies for AI agent and automation systems — built on synthetic data
        with evals and tests. Not client engagements. Starting freelance AI agent/automation
        work on Upwork and Contra.
      </Intro>
      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard key={project.title}>
            <div>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectMeta>{project.meta}</ProjectMeta>
              <DetailBlock>
                <DetailLabel>Problem</DetailLabel>
                <DetailText>{project.problem}</DetailText>
              </DetailBlock>
              <DetailBlock>
                <DetailLabel>What it does</DetailLabel>
                <DetailText>{project.does}</DetailText>
              </DetailBlock>
              <DetailBlock>
                <DetailLabel>Architecture</DetailLabel>
                <DetailText>{project.architecture}</DetailText>
              </DetailBlock>
              <DetailBlock>
                <DetailLabel>Human-in-the-loop</DetailLabel>
                <DetailText>{project.safety}</DetailText>
              </DetailBlock>
              <AvailabilityNote>
                Code and demo walkthrough available on request.
              </AvailabilityNote>
            </div>
            <ProjectTech>
              {project.tech.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </ProjectTech>
          </ProjectCard>
        ))}
      </ProjectGrid>
      <HireBlurb>
        <HireTitle>Hire me for AI automation</HireTitle>
        <HireText>
          Looking for lead intake, document Q&amp;A, inbox triage, or document extraction
          workflows with human approval gates? Reach me via the{' '}
          <a href="#contact">contact form</a> or at <strong>sanjaye@usc.edu</strong>.
        </HireText>
      </HireBlurb>
    </AutomationContainer>
  );
}

export default AIAutomation;
