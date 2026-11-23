import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.spacing.navHeight};
  background-color: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
  box-shadow: 0 2px 20px ${({ theme }) => `${theme.colors.primary}10`};

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Logo = styled.button`
  font-size: 24px;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  border: none;
  cursor: pointer;
  padding: 5px;
  
  outline: none;
  background-color: transparent;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    top: ${({ theme }) => theme.spacing.navHeight};
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.surface};
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.spacing.navHeight});
    padding: 40px 0;
    transition: right 0.3s ease;
    gap: 40px;
    
    &::before {
      display: none;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 30px;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 24px;
    background: ${({ theme }) => `${theme.colors.primary}20`};
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
    
    &::before {
      display: none;
    }
  }

  @media (min-width: 1440px) {
    gap: 20px;
    margin-left: 40px;
    padding-left: 30px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (min-width: 1440px) {
    font-size: 20px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.primary}10`};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    background: ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <Logo onClick={scrollToTop}>Ashwin</Logo>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      <NavLinks isOpen={isOpen}>
        <NavLink href="#about" onClick={closeMenu}>About</NavLink>
        <NavLink href="#resume" onClick={closeMenu}>Resume</NavLink>
        <NavLink href="#projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink href="#ai-automation" onClick={closeMenu}>AI Automation</NavLink>
        <NavLink href="#experience" onClick={closeMenu}>Experience</NavLink>
        <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
        <SocialLinks>
          <SocialLink 
            href="https://www.linkedin.com/in/ashwin-sanjaye" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink 
            href="https://github.com/asanjaye"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </SocialLink>
        </SocialLinks>
      </NavLinks>
    </Nav>
  );
}

export default Navbar; 