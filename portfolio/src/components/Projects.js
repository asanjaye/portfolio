import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';
import { FaGithub } from 'react-icons/fa';

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

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
  gap: 1.5rem;

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

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 20px;
  transition: all 0.3s ease;
  padding: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  line-height: 1.8;
  margin: 1.2rem 0;
  letter-spacing: 0.3px;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
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

const ProjectsContainer = styled(Container)`
  text-align: center;
`;

function Projects() {
  const projects = [
    {
      title: "Snap2Spoon",
      description: "Swift recipe recommendation application using OCR text parsing algorithm to parse receipts for ingredient data and leveraged OpenAI API to provide recommendations.",
      tech: ["Swift", "OCR", "OpenAI API", "Machine Learning"],
      link: "https://github.com/AlexRowshan/Snap2Spoon"
    },
    {
      title: "Abalone Age Prediction Model",
      description: "Engineered an automated neural network optimization pipeline for Abalone age prediction, implementing comprehensive hyperparameter tuning to maximize regression accuracy.",
      tech: ["Python", "Neural Networks", "Machine Learning", "Data Science"],
      link: "https://github.com/asanjaye/Abalone-Age-Prediction-Model"
    },
    {
      title: "Emotify",
      description: "AI Music recommendation platform utilizing OpenAI and Spotify APIs to create playlists based on user mood. Features personalized user interface and mood detection.",
      tech: ["JavaScript", "Java Servlets", "MySQL", "OpenAI API", "Spotify API"],
      link: "https://github.com/lavanya-sharma/csci201project"
    },
    {
      title: "Medisense",
      description: "Typescript application with Flask, utilizing fine-tuned Random Forest Classification to help doctors accurately diagnose patients based on symptom data.",
      tech: ["TypeScript", "Flask", "Random Forest", "Machine Learning"],
      link: "https://github.com/asanjaye/Medisense"
    }
  ];

  return (
    <ProjectsContainer>
      <SectionTitle>My Projects</SectionTitle>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <div>
              <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectLink 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project on GitHub"
                >
                  <FaGithub />
                </ProjectLink>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
            </div>
            <ProjectTech>
              {project.tech.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </ProjectTech>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
  );
}

export default Projects;