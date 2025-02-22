import styled from 'styled-components';

const ZigzagLine = styled.div`
  position: absolute;
  left: ${props => props.isEven ? '75%' : '25%'};
  top: -50%;
  bottom: -50%;
  width: 4px;
  background: ${({ theme }) => theme.colors.primaryGradient};
  opacity: 0.3;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 50vw;
    height: 4px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    opacity: 0.3;
    left: ${props => props.isEven ? '-50vw' : '0'};
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

export default ZigzagLine; 