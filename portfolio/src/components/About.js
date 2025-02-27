import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';
import { FaCode, FaServer, FaDatabase, FaDesktop } from 'react-icons/fa';

const AboutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkillsSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const SkillsHeader = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SkillCategories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  &::before {
    content: '▹';
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
    transition: all 0.3s ease;
  }
`;

function About() {
  const skillCategories = {
    languages: {
      icon: <FaCode />,
      title: "Languages",
      skills: ["Python", "Java", "JavaScript", "C++"]
    },
    frontend: {
      icon: <FaDesktop />,
      title: "Frontend",
      skills: ["React", "TypeScript", "HTML/CSS", "Three.js"]
    },
    backend: {
      icon: <FaServer />,
      title: "Backend",
      skills: ["Spring Boot", "Node.js", "Flask", "Express"]
    },
    data: {
      icon: <FaDatabase />,
      title: "Data & ML",
      skills: ["PyTorch", "SQL", "scikit-learn", "PostgreSQL"]
    }
  };

  return (
    <AboutContainer>
      <SectionTitle>About Me</SectionTitle>
      <Content>
        <AboutText>
          <p>
            I am a <strong>Computer Science and Business Administration student at USC</strong> with a passion for building innovative software solutions. 
            My journey in software development has been driven by a curiosity to explore new technologies and solve complex problems.
          </p>
          <p>
            With experience in <strong>full-stack development</strong>, I specialize in creating scalable web applications. 
            My work at <strong>Cityside Fiber</strong> and internships at <strong>Mercury Insurance</strong> and <strong>Simplain Software</strong> have given me strong foundations in software engineering practices and team collaboration.
          </p>
          <p>
            I'm constantly learning and exploring new technologies, with a particular interest in machine learning, DevOps, and modern web development. Currently, I'm focused on developing AI-powered applications and improving system architectures.
          </p>
        </AboutText>
        <SkillsSection>
          <SkillsHeader>
            <FaCode /> Technical Skills
          </SkillsHeader>
          <SkillCategories>
            {Object.entries(skillCategories).map(([key, category]) => (
              <SkillCategory key={key}>
                <CategoryTitle>
                  {category.icon} {category.title}
                </CategoryTitle>
                <SkillsList>
                  {category.skills.map((skill, index) => (
                    <SkillItem key={index}>{skill}</SkillItem>
                  ))}
                </SkillsList>
              </SkillCategory>
            ))}
          </SkillCategories>
        </SkillsSection>
      </Content>
    </AboutContainer>
  );
}

export default About; 