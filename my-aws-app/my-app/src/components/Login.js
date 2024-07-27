import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authenticate } from '../services/authenticate';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (field, value) => {
    if (field === 'email') setemail(value);
    if (field === 'password') setPassword(value);
  };

  const validate = () => {
    let errs = {};
    if (!email) errs.email = 'email is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const clearLoginInformation = () => {
    setemail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError('');
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      authenticate(email, password)
        .then((data) => {
          setLoginError('');
          navigate('/dashboard');
        }, (err) => {
          clearLoginInformation()
          console.log(err);
          setLoginError(err.message);
        })
        .catch(err => console.log(err));
    } else {
      setErrors(errs);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Login</h2>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
