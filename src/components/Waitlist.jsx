import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WaitlistSection = styled.section`
  padding: 5rem 0;
  background-color: #0a0a0a;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: #aaa;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: #111;
  border-radius: 15px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #222;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #222;
  color: white;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3050c8;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  background-color: rgba(52, 211, 153, 0.2);
  border-radius: 8px;
  color: #34D399;
  margin-top: 1rem;
`;

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send the data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };
  
  return (
    <WaitlistSection id="waitlist">
      <SectionTitle>Join the Waitlist</SectionTitle>
      <SectionSubtitle>
        Be among the first to experience the next generation of intelligent OCR technology
      </SectionSubtitle>
      
      <FormContainer>
        {!isSubmitted ? (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="useCase">How do you plan to use a_OCR?</Label>
              <TextArea 
                id="useCase" 
                name="useCase" 
                value={formData.useCase}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <SubmitButton 
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Waitlist
            </SubmitButton>
          </Form>
        ) : (
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Thank you for joining our waitlist!</h3>
            <p>We'll notify you when a_OCR is ready for your use case.</p>
          </SuccessMessage>
        )}
      </FormContainer>
    </WaitlistSection>
  );
};

export default Waitlist; 