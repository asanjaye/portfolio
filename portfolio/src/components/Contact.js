import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from './common/Section';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaUser, FaPaperPlane, FaLinkedin, FaGithub } from 'react-icons/fa';

// Update the EmailJS initialization with your public key
emailjs.init("7cMSv_HihjONNrE1P");

const ContactContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const ContactTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 16px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  padding: 12px;
  background: ${({ theme }) => `${theme.colors.primary}15`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    background: ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const inputStyles = `
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 2px solid ${({ theme }) => `${theme.colors.primary}20`};
  background: ${({ theme }) => `${theme.colors.background}90`};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 16px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: ${({ theme }) => theme.colors.background};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ success, theme }) => 
    success ? `${theme.colors.success}15` : `${theme.colors.error}15`};
  color: ${({ success, theme }) => 
    success ? theme.colors.success : theme.colors.error};
  font-weight: 500;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState('success');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      console.log('Sending email with data:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      const result = await emailjs.send(
        'service_xfkdj7q',    
        'template_qbenub8',   
        {
          to_name: 'Ashwin',
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        '7cMSv_HihjONNrE1P'
      );
      
      console.log('Email sent successfully:', result);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setStatus('Message sent successfully! I will get back to you soon.');
      setStatusType('success');
    } catch (error) {
      console.error('Detailed error:', error);
      setStatus('Failed to send message. Please try again later.');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear status message after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <ContactContainer>
      <SectionTitle>Get In Touch</SectionTitle>
      <ContactGrid>
        <ContactInfo>
          <ContactTitle>Let's Connect</ContactTitle>
          <ContactText>
            I'm currently open to new opportunities and collaborations. Whether you have a question
            or just want to say hi, I'll try my best to get back to you!
          </ContactText>
          <ContactText>
            You can also reach me directly at:
            <br />
            <strong>sanjaye@usc.edu</strong>
          </ContactText>
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
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">
              <FaUser /> Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Your name"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">
              <FaEnvelope /> Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="your.email@example.com"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="subject">
              <FaPaperPlane /> Subject
            </Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="What's this about?"
            />
          </InputGroup>
          <InputGroup>
            <Label>Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Your message here..."
            />
          </InputGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message <FaPaperPlane />
              </>
            )}
          </SubmitButton>
          {status && (
            <StatusMessage success={statusType === 'success'}>
              {status}
            </StatusMessage>
          )}
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
}

export default Contact; 