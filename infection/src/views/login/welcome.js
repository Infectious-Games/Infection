import React from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';

import infectionLogo from '../../images/infection-logo-alt-1.png';
import LoginView from './loginView';

const Welcome = () => (
  <Grid className="welcome">
    <Row className="welcome">
      <Col md={2} />
      <Col className="welcome" md={8}>
        <Image src={infectionLogo} alt="logo" responsive />
      </Col>
      <Col md={2} />
    </Row>
    <Row>
      <Col md={2} />
      <Col md={8}>
        <h1 className="welcome">Welcome to the team!</h1>
        <p>
          Our mission is to stop infectious outbreaks threatening the United
          States
        </p>
      </Col>
      <Col md={2} />
    </Row>
    <Row className="login">
      <Col md={4} />
      <Col md={4}>
        <LoginView />
      </Col>
      <Col md={4} />
    </Row>
  </Grid>
);

export default Welcome;
