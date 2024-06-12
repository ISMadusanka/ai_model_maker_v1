import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function SignInPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-25">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button href='/projects/allprojects' variant="primary" type="submit" className="w-100 mb-3">
            Sign In
          </Button>
          <div className="text-center">
            <Form.Text className="text-muted">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Form.Text>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignInPage;
