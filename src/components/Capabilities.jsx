import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CapabilitiesSection = styled.section`
  padding: 5rem 0;
  background-color: #000;
  overflow: hidden;
`;

const CapabilitiesTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const CapabilitiesList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CapabilityItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  padding: 2.5rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const CapabilityTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 700;
  max-width: 400px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }
`;

const CapabilityDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 450px;
  color: #aaa;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

// Animation variants
const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
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

const titleSlideVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const descriptionSlideVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Capabilities = () => {
  const capabilitiesData = [
    {
      title: "LLLM Ingestion ready output",
      description: "Get data that has already been parsed to input directly into LLMs an build application"
    },
    {
      title: "Information filtering & retrieval in Natural language",
      description: "a_OCR can filter relevant information and leave out unnecessary jargon based on requirements"
    },
    {
      title: "Context building",
      description: "It understands the context of what the uploaded file is about"
    }
  ];

  return (
    <CapabilitiesSection id="capabilities">
      <CapabilitiesTitle
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={titleVariants}
      >
        Other capabilities
      </CapabilitiesTitle>
      <CapabilitiesList>
        {capabilitiesData.map((capability, index) => (
          <CapabilityItem
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1, delayChildren: index * 0.1 }}
          >
            <CapabilityTitle variants={titleSlideVariants}>
              {capability.title}
            </CapabilityTitle>
            <CapabilityDescription variants={descriptionSlideVariants}>
              {capability.description}
            </CapabilityDescription>
          </CapabilityItem>
        ))}
      </CapabilitiesList>
    </CapabilitiesSection>
  );
};

export default Capabilities; 