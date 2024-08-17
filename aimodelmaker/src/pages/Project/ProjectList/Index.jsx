import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProjectItemCard from "./ProjectItemCard";
import api from "../../../services/api/api";
import { useDashboard } from "../../../context/DashboardProvider";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setDashboardProps } = useDashboard();

  useEffect(() => {
    api
      .get("/allprojects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <StyledContainer className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </StyledContainer>
    );
  }

  const handleClick = (projectID) => {
    sessionStorage.setItem("projectID", projectID);
    setDashboardProps({ projectID });
  };

  return (
    <StyledContainer>
      <Title>Recent Projects</Title>
      <Row>
        <Col md={4} className="mb-4">
          <StyledLink to="/projects/newproject">
            <AddProjectCard>
              <CardBody>
                <CardTitle>Add Project</CardTitle>
                <Icon>+</Icon>
              </CardBody>
            </AddProjectCard>
          </StyledLink>
        </Col>
        {projects.map((project) => (
          <Col md={4} className="mb-4" key={project._id}>
            <StyledLink to={`/projects`} onClick={() => handleClick(project._id)}>
              <ProjectItemCardStyled
                projectID={project._id}
                name={project.name}
                description={project.description}
                icon={project.icon}
              />
            </StyledLink>
          </Col>
        ))}
      </Row>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  background-color: #f4f7fa;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AddProjectCard = styled.div`
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  border-radius: 12px;
  text-align: center;
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.h5`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Icon = styled.div`
  font-size: 3rem;
  color: #ffffff;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectItemCardStyled = styled(ProjectItemCard)`
  ${ProjectCard}
`;
