// src/components/DocumentationPage.js
import React, { useState } from "react";
import styled from "styled-components";

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("Introduction");

  const renderContent = () => {
    switch (activeSection) {
      case "Introduction":
        return (
          <Content>
            <SectionTitle>Introduction</SectionTitle>
            <Paragraph>
              Welcome to the documentation for AI Model Builder. This guide will walk you through everything you need to know about using our platform to create and deploy AI models.
            </Paragraph>
          </Content>
        );
      case "Getting Started":
        return (
          <Content>
            <SectionTitle>Getting Started</SectionTitle>
            <Paragraph>
              To get started, you'll need to sign up for an account. Once you're logged in, you can begin creating your first model by following these simple steps.
            </Paragraph>
          </Content>
        );
      case "API Reference":
        return (
          <Content>
            <SectionTitle>API Reference</SectionTitle>
            <Paragraph>
              Our API allows you to interact programmatically with your AI models. Below you'll find detailed information on each endpoint.
            </Paragraph>
          </Content>
        );
      case "FAQ":
        return (
          <Content>
            <SectionTitle>FAQ</SectionTitle>
            <Paragraph>
              Here are some frequently asked questions about our platform. If you have any other questions, feel free to reach out to our support team.
            </Paragraph>
          </Content>
        );
      default:
        return <Content>Select a section from the sidebar.</Content>;
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarItem onClick={() => setActiveSection("Introduction")}>
          Introduction
        </SidebarItem>
        <SidebarItem onClick={() => setActiveSection("Getting Started")}>
          Getting Started
        </SidebarItem>
        <SidebarItem onClick={() => setActiveSection("API Reference")}>
          API Reference
        </SidebarItem>
        <SidebarItem onClick={() => setActiveSection("FAQ")}>FAQ</SidebarItem>
      </Sidebar>
      <MainContent>{renderContent()}</MainContent>
    </Container>
  );
};

export default DocsPage;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled.div`
  margin: 15px 0;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    color: #3498db;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  background-color: #ecf0f1;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #2c3e50;
`;
