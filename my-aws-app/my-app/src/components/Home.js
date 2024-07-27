import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 text-center">
        <Col>
          <Typography variant='h3' className="mb-4">Welcome</Typography>
          <div className='homeButtons'>
            <Button style={{ margin: '10px' }} variant='contained' onClick={() => navigate('/signup')}>
              Signup
            </Button>
            <Button style={{ margin: '10px' }} variant='contained' onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
