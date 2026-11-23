import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import AIAutomation from './components/AIAutomation';
import Experience from './components/Experience';
import Contact from './components/Contact';

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.sectionPadding};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  scroll-margin-top: ${({ theme }) => theme.spacing.navHeight};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />
        <Section id="home">
          <Hero />
        </Section>
        <Section id="about">
          <About />
        </Section>
        <Section id="resume">
          <Resume />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="ai-automation">
          <AIAutomation />
        </Section>
        <Section id="experience">
          <Experience />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
