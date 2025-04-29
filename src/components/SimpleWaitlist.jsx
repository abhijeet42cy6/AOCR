import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Google Form configuration
const FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfRKXy-AIBB1O-0kg5gRY5CcNoq929itBfwSA060JyIExLiOg/formResponse";
const EMAIL_FIELD_NAME = "entry.459592673";
const USE_CASE_FIELD_NAME = "entry.1136897666";

const WaitlistSection = styled.section`
  padding: 5rem 0;
  background-color: #000;
  text-align: center;
  overflow: hidden;
`;

const WaitlistTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const EmailInput = styled(motion.input)`
  width: 100%;
  height: 54px;
  padding: 0 1rem;
  padding-right: 3.5rem; /* Increased space for the arrow */
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #111;
  color: white;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  &::placeholder {
    color: #777;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  right: 12px;
  top: 27px; /* Half of the input height (54px / 2) */
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  padding: 10px;
  transition: transform 0.3s ease;
  z-index: 2;
  
  &:hover {
    transform: translateY(-50%) translateX(2px);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const AccessText = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

// Modal styling
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: #111;
  border-radius: 8px;
  width: 100%;
  max-width: 500px; /* Same width as input */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalTopSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ContactText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #222;
  color: white;
  font-size: 1rem;
  margin: 1rem 0;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  &::placeholder {
    color: #777;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  justify-content: space-between;
`;

const SkipButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #aaa;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #222;
  }
`;

const ContinueButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3050c8;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
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
  hidden: { y: 30, opacity: 0 },
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

const inputVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

const SimpleWaitlist = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const modalFormRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && email) {
      handleSubmit(e);
    }
  };
  
  const closeModal = () => {
    if (!submitted) {
      // Submit with just email if they close without feedback
      submitToGoogleForm(email, "");
    }
    setShowModal(false);
    setEmail('');
    setFeedback('');
    setSubmitted(false);
  };
  
  const handleFeedbackSubmit = () => {
    submitToGoogleForm(email, feedback);
    setSubmitted(true);
    setTimeout(closeModal, 1500); // Close after 1.5 seconds to show success
  };
  
  const submitToGoogleForm = (emailValue, useCaseValue) => {
    // Create a hidden form to submit to Google
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_ACTION_URL;
    form.target = '_blank'; // Submit in background
    
    // Add email field
    const emailField = document.createElement('input');
    emailField.type = 'email';
    emailField.name = EMAIL_FIELD_NAME;
    emailField.value = emailValue;
    form.appendChild(emailField);
    
    // Add use case field
    const useCaseField = document.createElement('input');
    useCaseField.type = 'text';
    useCaseField.name = USE_CASE_FIELD_NAME;
    useCaseField.value = useCaseValue || '';
    form.appendChild(useCaseField);
    
    // Submit the form
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
  
  // Arrow icon component
  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
  
  return (
    <WaitlistSection id="simple-waitlist">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <WaitlistTitle variants={itemVariants}>Join the waitlist</WaitlistTitle>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <InputContainer>
            <EmailInput
              type="email"
              name={EMAIL_FIELD_NAME}
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              variants={inputVariants}
            />
            <ArrowButton 
              type="submit" 
              aria-label="Submit email"
              onClick={handleSubmit}
            >
              <ArrowIcon />
            </ArrowButton>
          </InputContainer>
        </Form>
        <AccessText variants={itemVariants}>Get early access to the state-of-the Art OCR</AccessText>
      </motion.div>
      
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => {
              // Close modal when clicking overlay but not content
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTopSection>
                <ModalTitle>Thanks for joining our waitlist!</ModalTitle>
                <ModalText>
                  We've received your email: <strong>{email}</strong><br />
                  Would you like to tell us more about how you plan to use a_OCR?
                </ModalText>
                
                <ModalInput
                  type="text"
                  name={USE_CASE_FIELD_NAME}
                  placeholder="Tell us how you plan to use a_OCR"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                
                <ContactText>
                  Reach out to us at- team@aocr.in
                </ContactText>
              </ModalTopSection>
              
              <ModalButtons>
                {!feedback && (
                  <SkipButton onClick={closeModal}>Skip</SkipButton>
                )}
                
                {feedback ? (
                  <ContinueButton onClick={handleFeedbackSubmit} style={{ marginLeft: 'auto' }}>
                    {submitted ? "Submitted!" : "Submit"}
                    {!submitted && <ArrowIcon />}
                  </ContinueButton>
                ) : (
                  <ContinueButton onClick={closeModal}>
                    Continue
                    <ArrowIcon />
                  </ContinueButton>
                )}
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </WaitlistSection>
  );
};

export default SimpleWaitlist; 