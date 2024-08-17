import React, { useEffect, useState } from 'react'
import api from '../../services/api/api'
import styled from "styled-components";

export default function HomePage() {

  //fetct data from api
  const [data, setData] = useState("No data")
  
  useEffect(() => {
    api.get('/profile')
      .then(response => {
        console.log(response.data)
        setData(response.data.email)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Container>
      <HeroSection>
        <Title>Welcome to AI Model Builder</Title>
        <Subtitle>Create AI models with ease</Subtitle>
        <CTAButton>Get Started</CTAButton>
      </HeroSection>

      <FeaturesSection>
        <Feature>
          <FeatureTitle>Easy to Use</FeatureTitle>
          <FeatureDescription>
            Our platform is designed with simplicity in mind, making it easy to build models without any coding.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>Powerful Tools</FeatureTitle>
          <FeatureDescription>
            Access a wide range of tools to create, train, and deploy your models.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>Scalable Solutions</FeatureTitle>
          <FeatureDescription>
            Whether you're building a small model or a large-scale solution, we have you covered.
          </FeatureDescription>
        </Feature>
      </FeaturesSection>

      <Footer>
        <FooterText>© 2024 AI Model Builder. All rights reserved.</FooterText>
      </Footer>
    </Container>
    </div>
  )
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  width: 100%;
  padding: 100px 20px;
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const CTAButton = styled.button`
  background-color: #ff7f50;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6347;
  }
`;

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 50px 20px;
  background-color: #f9f9f9;
  width: 100%;
`;

const Feature = styled.div`
  max-width: 300px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Footer = styled.footer`
  background-color: #333;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  color: #fff;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
`;
