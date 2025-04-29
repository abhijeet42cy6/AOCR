import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BenchmarksSection = styled.section`
  padding: 5rem 0;
  background-color: #000;
  overflow: hidden;
  
  /* Global text rendering enhancements */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`;

// New styles for benchmark comparison
const ComparisonSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
`;

const ComparisonTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
  line-height: 1.3;
  font-weight: 700;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const HighlightedText = styled.span`
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ComparisonItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ComparisonLabel = styled.h3`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

// Global hover effect override for the ComparisonChart component
const ComparisonChart = styled(motion.div)`
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.4s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                0 0 20px rgba(65, 105, 225, 0.3);
    z-index: 10;
    
    /* This applies to all images by default */
    img {
      filter: invert(1) hue-rotate(200deg) saturate(1.4) contrast(1.3) brightness(1.05);
      /* Enhanced text quality preservation during hover */
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
  
  &:active {
    transform: translateY(-5px) scale(1.02);
    transition: transform 0.1s ease;
  }
`;

// Specific styling for each benchmark chart with consistent blue glows
const AccuracyChart = styled(ComparisonChart)`
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                0 0 20px rgba(65, 105, 225, 0.4);
  }
`;

// Special chart styling for cost efficiency - override the image hover
const CostEfficiencyChart = styled(ComparisonChart)`
  /* Important: override the default img filter on hover */
  &:hover {
    img {
      filter: none !important; /* Use !important to ensure this takes precedence */
    }
  }
`;

const InferenceTimeChart = styled(ComparisonChart)`
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                0 0 20px rgba(65, 105, 225, 0.4);
  }
`;

const BenchmarkWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 0 1px #000;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 0.5px rgba(255, 255, 255, 0.2);
    z-index: 2;
  }
`;

// Global image styling for sharper text
const BenchmarkImage = styled.img`
  width: calc(100% + 4px);
  height: auto;
  display: block;
  filter: invert(1) hue-rotate(200deg) contrast(1.2) brightness(1.05) grayscale(0.1);
  background-color: transparent;
  margin: -2px;
  border: none;
  outline: none;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  transform: scale(1.001); /* Slight scale to improve rendering */
  
  /* Enhanced text rendering for all images */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform;
`;

// Specific styling for accuracy image with enhanced text quality
const AccuracyImage = styled(BenchmarkImage)`
  margin-left: -3px; /* Extra margin to fix left white line */
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0); /* Hardware acceleration */
`;

// Specific styling for cost efficiency image with enhanced text quality
const CostEfficiencyImage = styled(BenchmarkImage)`
  /* Using the image exactly as it is - removing all filters */
  filter: none;
  /* Keep the exact same pop-up behavior as other images */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0); /* Hardware acceleration */
`;

// Specific styling for inference time image with enhanced text quality
const InferenceTimeImage = styled(BenchmarkImage)`
  margin-top: -3px; /* Extra margin to fix top white line */
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0); /* Hardware acceleration */
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
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

const chartVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

// Add special wrapper for cost efficiency
const CostEfficiencyWrapper = styled(BenchmarkWrapper)`
  /* Ensure consistent background behavior on hover */
  background-color: transparent;
  
  &::before,
  &::after {
    display: none; /* Remove any pseudo-elements that might affect background */
  }
`;

const Benchmarks = () => {
  // Force image refresh when component loads
  React.useEffect(() => {
    // Clear any cached images
    const refreshImages = () => {
      const imgs = document.querySelectorAll('img[src="/cost_efficiency.png"]');
      if (imgs.length > 0) {
        imgs.forEach(img => {
          // Force reload the image
          img.src = `/cost_efficiency.png?t=${new Date().getTime()}`;
        });
      }
    };
    
    // Small delay to ensure DOM is ready
    setTimeout(refreshImages, 100);
  }, []);

  return (
    <BenchmarksSection id="benchmarks">
      
      {/* Comparison section */}
      <ComparisonSection>
        <ComparisonTitle
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          a_OCR is the best in - <HighlightedText>cost efficiency</HighlightedText>, <HighlightedText>text alignment</HighlightedText> and <HighlightedText>inference time</HighlightedText>
        </ComparisonTitle>
        
        <ComparisonItem
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <ComparisonLabel>accuracy</ComparisonLabel>
          </motion.div>
          <motion.div variants={chartVariants}>
            <AccuracyChart>
              <BenchmarkWrapper>
                <AccuracyImage src="/accuracy.png" alt="Accuracy benchmark comparison" />
              </BenchmarkWrapper>
            </AccuracyChart>
          </motion.div>
        </ComparisonItem>
        
        <ComparisonItem
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <ComparisonLabel>cost<br />efficiency</ComparisonLabel>
          </motion.div>
          <motion.div variants={chartVariants}>
            <CostEfficiencyChart>
              <CostEfficiencyWrapper>
                <CostEfficiencyImage 
                  src={`/cost_efficiency.png?t=${Date.now()}`}
                  alt="Cost efficiency benchmark comparison"
                  key={`cost-efficiency-${Date.now()}`}
                />
              </CostEfficiencyWrapper>
            </CostEfficiencyChart>
          </motion.div>
        </ComparisonItem>
        
        {/*<ComparisonItem
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <ComparisonLabel>text spacing<br />& ranking</ComparisonLabel>
          </motion.div>
          <motion.div variants={chartVariants}>
            <ComparisonChart />
          </motion.div>
        </ComparisonItem>*/}
        
        <ComparisonItem
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <ComparisonLabel>inference<br />time</ComparisonLabel>
          </motion.div>
          <motion.div variants={chartVariants}>
            <InferenceTimeChart>
              <BenchmarkWrapper>
                <InferenceTimeImage src="/Inference_time.png" alt="Inference time benchmark comparison" />
              </BenchmarkWrapper>
            </InferenceTimeChart>
          </motion.div>
        </ComparisonItem>
      </ComparisonSection>
    </BenchmarksSection>
  );
};

export default Benchmarks; 