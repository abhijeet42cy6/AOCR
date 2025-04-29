import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #111;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #111;
    padding: 1rem;
    gap: 1rem;
    border-top: 1px solid #333;
  }
`;

const MenuItem = styled.a`
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav>
      <Logo href="#">a_</Logo>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
      <MenuItems isOpen={isMenuOpen}>
        <MenuItem href="#benchmarks">Benchmarks</MenuItem>
        <MenuItem href="#capabilities">Capabilities</MenuItem>
        <MenuItem href="#simple-waitlist">Waitlist</MenuItem>
      </MenuItems>
    </Nav>
  );
};

export default Navbar; 