import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ProjectItemCard from './ProjectItemCard';
import { Link } from 'react-router-dom';
import api from '../../../services/api/api';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/allprojects')
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
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Recent projects</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Link to='/projects/newproject'>
            <div className="project-card add-new-card">
              <div className="card-body">
                <h5 className="card-title">Add project</h5>
                <div className="icon">
                  Add
                </div>
              </div>
            </div>
          </Link>
        </Col>
        {projects.map((project) => (
          <Col md={4} className="mb-4" key={project.id}>
            <Link to={`/projects`}>
              <ProjectItemCard
                projectID={project.id}
                name={project.name}
                description={project.description}
                icon={project.icon}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
