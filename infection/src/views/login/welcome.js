import React from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';

import infectionLogo from '../../images/Infection.jpg';
import Login from '../../components/login';

const Welcome = ({ login }) =>
  <Grid className="welcome">
    <Row className="welcome">
      <Col md={2}></Col>
      <Col
        className="welcome"
        md={8}
      >
        <Image src={infectionLogo} alt="logo" responsive />
      </Col>
      <Col md={2}></Col>
    </Row >
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <h1 className="welcome">Welcome to the team!</h1>
          <p>Our mission is to stop infectious outbreaks threatening the United States</p>
      </Col>
      <Col md={2}></Col>
    </Row>
    <Row className="login">
      <Col md={4}></Col>
      <Col md={4}>
        <Login login={login}></Login>
      </Col>
      <Col md={4}></Col>
    </Row>
  </Grid>


export default Welcome;