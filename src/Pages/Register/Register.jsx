// src/pages/Register/Register.jsx
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";

function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row>
        <Col>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-3">Register</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100 mb-2">
                Sign Up
              </Button>
              <div className="text-center">
                <small>
                  Already have an account?{" "}
                  <span className="text-success pointer" onClick={switchToLogin}>
                    Sign in
                  </span>
                </small>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
