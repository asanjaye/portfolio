import styled from 'styled-components';

export const Section = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.sectionPadding};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  scroll-margin-top: ${({ theme }) => theme.spacing.navHeight};
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.gap.medium};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gap.medium};
`; 