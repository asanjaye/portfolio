import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, SectionTitle } from './common/Section';
import { FaDownload, FaExpand, FaCompress, FaFileAlt } from 'react-icons/fa';

const ResumeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ResumeActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: ${({ isViewing }) => isViewing ? '2rem' : '0'};
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    transform: translateY(-2px);
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResumeFrame = styled.iframe`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.colors.surface};
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

const PlaceholderContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem;
  background: ${({ theme }) => `${theme.colors.primary}08`};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
  width: 100%;
  max-width: 400px;
  margin: 2rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    transform: translateY(-5px);
  }
`;

const AnimatedIcon = styled(FaFileAlt)`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  animation: ${float} 3s ease-in-out infinite;
`;

const PlaceholderText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

function Resume() {
  const [isViewing, setIsViewing] = useState(false);

  const toggleView = () => {
    setIsViewing(!isViewing);
  };

  return (
    <ResumeContainer>
      <SectionTitle>Resume</SectionTitle>
      <ResumeActions isViewing={isViewing}>
        <ActionButton 
          href="/Ashwin Sanjaye Resume March 2025.pdf" 
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload /> Download PDF
        </ActionButton>
        {isViewing && (
          <ActionButton 
            as="button"
            onClick={toggleView}
          >
            <FaCompress /> Hide Resume
          </ActionButton>
        )}
      </ResumeActions>
      {isViewing ? (
        <ResumeFrame 
          src="/Ashwin Sanjaye Resume March 2025.pdf"
          title="Resume"
        />
      ) : (
        <PlaceholderContainer onClick={toggleView}>
          <AnimatedIcon />
          <PlaceholderText>
            Click here to view resume
          </PlaceholderText>
        </PlaceholderContainer>
      )}
    </ResumeContainer>
  );
}

export default Resume; 