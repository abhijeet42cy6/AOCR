import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  padding: 4rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HighlightedText = styled.span`
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1.5rem;
  }
`;

const MadeInIndiaButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: white;
  color: black;
  padding: 0.7rem 1.5rem;
  border-radius: 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 0 auto 3rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const DemoPlaceholder = styled(motion.div)`
  width: 95%;
  max-width: 1100px;
  height: auto;
  background-color: transparent;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.4s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                0 0 20px rgba(65, 105, 225, 0.3);
    z-index: 10;
    
    img {
      filter: invert(1) hue-rotate(200deg) saturate(1.4) contrast(1.3) brightness(1.05);
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
  
  &:active {
    transform: translateY(-5px) scale(1.02);
    transition: transform 0.1s ease;
  }
`;

const DemoImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: filter 0.4s ease;
  border-radius: 10px;
`;

const StrongText = styled.strong`
  font-weight: 600;
`;

const FlagIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="5" fill="#FF9933" />
    <rect y="5" width="20" height="5" fill="#FFFFFF" />
    <rect y="10" width="20" height="5" fill="#138808" />
    <circle cx="10" cy="7.5" r="1.5" fill="#000080" />
  </svg>
);

const ButtonText = styled.span`
  padding-left: 4px;
  display: inline-block;
  letter-spacing: 0.5px;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const riseVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

const Hero = () => {
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Preload the image to get its dimensions
    const img = new Image();
    img.onload = () => {
      setImgDimensions({
        width: img.width,
        height: img.height
      });
    };
    img.src = '/Group 1.jpg';
  }, []);
  
  return (
    <HeroSection>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title variants={itemVariants}>
          a_OCR that <HighlightedText>understands and explains</HighlightedText>
        </Title>
        <Subtitle variants={itemVariants}>
          R2-D2 OCR is capable of reading, <StrongText>understanding</StrongText>, extracting data from complex documents and makes them LLM ready
        </Subtitle>
        <MadeInIndiaButton variants={itemVariants}>
          <FlagIcon /> <ButtonText>made in India</ButtonText>
        </MadeInIndiaButton>
        <DemoPlaceholder 
          variants={riseVariants}
          style={{
            width: imgDimensions.width > 0 ? Math.min(imgDimensions.width, 1100) : '95%',
            maxWidth: '95%'
          }}
        >
          <DemoImage 
            src="/Group 1.jpg" 
            alt="a_OCR Demo"
            width={imgDimensions.width}
            height={imgDimensions.height}
          />
        </DemoPlaceholder>
      </motion.div>
    </HeroSection>
  );
};

export default Hero; 