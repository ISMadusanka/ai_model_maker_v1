import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link and NavLink
import { useAuth } from '../services/authentication/AuthProvider';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import api from '../services/api/api';

function HomeNavBar() {
  const user = useAuth();

  const onlogoutclick = () => {
    api.get('/logout').then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">AIModeler</Navbar.Brand> {/* Use Link for client-side navigation */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link> {/* Use NavLink for active class handling */}
            <Nav.Link as={NavLink} to="/docs">Docs</Nav.Link>
          </Nav>
          {user ? (
            <>
              <Button variant="outline-primary" as={Link} to="/projects/allprojects" className="me-2">
                Go to Console
              </Button>
              <NavDropdown
                title={<FaUserCircle size={24} />}
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={onlogoutclick}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button variant="outline-primary" as={Link} to="/signin">Login</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavBar;
