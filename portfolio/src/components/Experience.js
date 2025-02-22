import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gap.small};
`;

const ExperienceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const CompanyName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 5px;
`;

const Position = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const Duration = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function Experience() {
  const experiences = [
    {
      company: "Company Name",
      position: "Senior Developer",
      duration: "2021 - Present",
      description: "Description of responsibilities and achievements"
    },
    // Add more experiences here
  ];

  return (
    <Container>
      <SectionTitle>Professional Experience</SectionTitle>
      <Timeline>
        {experiences.map((exp, index) => (
          <ExperienceCard key={index}>
            <CompanyName>{exp.company}</CompanyName>
            <Position>{exp.position}</Position>
            <Duration>{exp.duration}</Duration>
            <Description>{exp.description}</Description>
          </ExperienceCard>
        ))}
      </Timeline>
    </Container>
  );
}

export default Experience; 