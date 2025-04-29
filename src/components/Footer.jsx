import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #111;
  color: white;
  padding: 3rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Link = styled.a`
  color: white;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>a_OCR</Logo>
        <FooterLinks>
          <Link href="#benchmarks">Benchmarks</Link>
          <Link href="#features">Features</Link>
          <Link href="#waitlist">Join Waitlist</Link>
        </FooterLinks>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} a_OCR. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 