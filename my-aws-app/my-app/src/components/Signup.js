import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import userpool from '../userpool';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');

  const handleChange = (field, value) => {
    if (field === 'username') setUsername(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'favoriteSport') setFavoriteSport(value);
  };

  const validate = () => {
    let errs = {};
    if (!username) errs.username = 'Username is required';
    if (!email) errs.email = 'Email is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!favoriteSport) errs.favoriteSport = 'Favorite sport or team is required';
    return errs;
  };

  const clearData = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setFavoriteSport('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSignupError('');
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
      ];
      userpool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          console.log(err);
          if (err.code === 'UsernameExistsException') {
            setSignupError('User already exists');
            clearData();
          } else {
            setSignupError("Couldn't sign up. Please try again later.");
          }
        } else {
          console.log(data);

          localStorage.setItem('user', JSON.stringify({ username, favoriteSport }));
          clearData();
          navigate('/dashboard');
        }
      });
    } else {
      setErrors(errs);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {signupError && <Alert variant="danger">{signupError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => handleChange('username', e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Favorite Sport or Team</Form.Label>
              <Form.Control
                type="text"
                value={favoriteSport}
                onChange={(e) => handleChange('favoriteSport', e.target.value)}
                isInvalid={!!errors.favoriteSport}
              />
              <Form.Control.Feedback type="invalid">{errors.favoriteSport}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Sign Up</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
