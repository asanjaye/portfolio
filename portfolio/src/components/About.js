import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.gap.medium};
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function About() {
  return (
    <Container>
      <SectionTitle>About Me</SectionTitle>
      <Content>
        <div>
          <p>
            I am a passionate developer with experience in building modern web applications.
            My journey in software development started with... [Your story here]
          </p>
        </div>
        <div>
          <h3>Skills</h3>
          <SkillsList>
            <SkillItem>React.js & Modern JavaScript</SkillItem>
            <SkillItem>Node.js & Express</SkillItem>
            <SkillItem>Three.js & WebGL</SkillItem>
            <SkillItem>CSS & Styled Components</SkillItem>
          </SkillsList>
        </div>
      </Content>
    </Container>
  );
}

export default About; 