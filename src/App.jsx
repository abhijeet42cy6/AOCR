import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benchmarks from './components/Benchmarks';
import Capabilities from './components/Capabilities';
import SimpleWaitlist from './components/SimpleWaitlist';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Hero />
      <Benchmarks />
      <Capabilities />
      <SimpleWaitlist />
      <Contact />
      <Footer />
    </AppContainer>
  );
}

export default App; 