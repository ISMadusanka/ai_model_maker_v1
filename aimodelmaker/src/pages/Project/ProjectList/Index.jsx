import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectItemCard from './ProjectItemCard';
import { Link } from 'react-router-dom';

export default function ProjectListPage() {
  const projects = [
    {   
      id: 1,
      name: "StudentReg",
      description: "studentreg-2d9e9",
      icon: 'i'
    },
    {   
      id: 2,
      name: "Ambasewana",
      description: "ambasewana-a6fa5",
      icon: 'i'
    },
    {   
      id: 3,
      name: "rrrr",
      description: "rrrr-bb201",
      icon: 'i'
    },
    {   
      id: 4,
      name: "SpireX",
      description: "spirex-e575d",
      icon: 'i'
    },
    {   
      id: 5,
      name: "Your Story",
      description: "your-story-20bf2",
      icon: 'i'
    },
    {   
        id: 6,
        name: "Your Story",
        description: "your-story-20bf2",
        icon: 'i'
      }
  ];

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
            <Link to="/projects" >
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
