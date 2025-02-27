import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, SectionTitle } from './common/Section';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const ExperienceContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gap.large};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const ExperienceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 32px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    opacity: 0.3;
  }

  &:hover {
    transform: translateX(10px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const CompanyName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    font-size: 20px;
  }
`;

const Position = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  margin-bottom: 12px;
`;

const Duration = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
`;

// Create a smooth fade animation
const fadeInOut = keyframes`
  0%, 20% { opacity: 0; transform: translateY(10px); }
  5%, 15% { opacity: 1; transform: translateY(0); }
`;

const RoleText = styled.span`
  display: inline-block;
  position: absolute;
  left: 0;
  opacity: 0;
  
  &:nth-child(1) { animation: ${fadeInOut} 16s ease-in-out infinite; }
  &:nth-child(2) { animation: ${fadeInOut} 16s ease-in-out infinite 4s; }
  &:nth-child(3) { animation: ${fadeInOut} 16s ease-in-out infinite 8s; }
  &:nth-child(4) { animation: ${fadeInOut} 16s ease-in-out infinite 12s; }
`;

const RoleContainer = styled.div`
  position: relative;
  height: 1.5em;
  min-width: 200px;
  display: inline-block;
  vertical-align: bottom;
`;

function Experience() {
  const experiences = [
    {
      company: "Cityside Fiber",
      position: "Junior Software/DevOps Engineer",
      duration: "May 2024 - Present",
      description: "Led development of internal tools and established secure infrastructure including DHCP firewall, authentication server, and reverse proxy setup.",
      tech: ["Express.js", "Node.js", "Microsoft SSO", "LAMP Stack", "Pfsense"]
    },
    {
      company: "Mercury Insurance",
      position: "Software Engineer Intern",
      duration: "May 2023 - Aug 2023",
      description: "Enhanced testing capabilities of Guidewire web application, improving runtime efficiency by 600% through automated test scripts and API integration.",
      tech: ["Selenium", "Java", "Python", "API Testing", "Guidewire"]
    },
    {
      company: "Simplain Software Solutions",
      position: "Software Engineer Intern",
      duration: "Jun 2022 - Aug 2022",
      description: "Developed RESTful APIs with Spring Boot and JPA, established PostgreSQL database connections, and created comprehensive documentation.",
      tech: ["Spring Boot", "PostgreSQL", "RESTful APIs", "Azure", "Figma"]
    }
  ];

  return (
    <ExperienceContainer>
      <SectionTitle>Professional Experience</SectionTitle>
      <Timeline>
        {experiences.map((exp, index) => (
          <ExperienceCard key={index}>
            <CompanyName>
              <FaBriefcase />
              {exp.company}
            </CompanyName>
            <Position>{exp.position}</Position>
            <Duration>
              <FaCalendarAlt />
              {exp.duration}
            </Duration>
            <Description>{exp.description}</Description>
            <TechStack>
              {exp.tech.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </TechStack>
          </ExperienceCard>
        ))}
      </Timeline>
    </ExperienceContainer>
  );
}

export default Experience; 