import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userpool from '../userpool';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../services/authenticate';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Dashboard = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: '',
    favoriteSport: ''
  });

  useEffect(() => {
    const user = userpool.getCurrentUser();
    if (!user) {
      navigate('/login');
    } else {
      user.getSession((err, session) => {
        if (err) {
          console.log(err);
          navigate('/login');
        } else {
          user.getUserAttributes((err, attributes) => {
            if (err) {
              console.log(err);
            } else {
              const user = JSON.parse(localStorage.getItem('user'));
              if (user) {
                setUserInfo({
                  username: user.username,
                  favoriteSport: user.favoriteSport
                });
              }
            }
          });
        }
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PayPalScriptProvider
      options={{
        'client-id': '',
        'currency': 'USD',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Hello, {userInfo.username}</Card.Title>
                <Card.Text>
                  Your favorite sport/team is {userInfo.favoriteSport}
                </Card.Text>
                <Card.Text>
                  You can support your favorite team by making a donation of $10.00 using the PayPal button below.
                </Card.Text>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'USD',
                            value: '10.00',
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      alert(`Transaction completed by ${details.payer_name.given_name}`);
                    });
                  }}
                />
                <Button onClick={handleLogout} className="mt-3">Logout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PayPalScriptProvider>
  );
};

export default Dashboard;
