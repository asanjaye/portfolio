import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.gap.medium};
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => `${theme.colors.primary}22`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1",
      tech: ["React", "Node.js", "MongoDB"]
    },
    // Add more projects here
  ];

  return (
    <Container>
      <SectionTitle>My Projects</SectionTitle>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectTech>
              {project.tech.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </ProjectTech>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
}

export default Projects; 