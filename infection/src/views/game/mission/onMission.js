import React from 'react';
import { Row, Button, Col } from 'react-bootstrap';

const OnMission = ({ choose, choiceMade }) =>
  !choiceMade ? (
    <Row>
      <h1>What Will You Do?</h1>
      <br />
      <Col md={4} />
      <Col md={4}>
        <Row>
          <Col sm={4} />
          <Col sm={4}>
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Button
                  onClick={() => choose('CURE')}
                  bsSize="large"
                  bsStyle="success"
                  block
                >
                  CURE
                </Button>
                {/* <Row>---OR---</Row> */}
                <br />
                <Button
                  onClick={() => choose('SABOTAGE')}
                  bsSize="large"
                  bsStyle="danger"
                  block
                >
                  SABOTAGE
                </Button>
              </Col>
              <Col xs={1} />
            </Row>
          </Col>
          <Col sm={4} />
        </Row>
      </Col>
      <Col md={4} />
    </Row>
  ) : (
    <Row>
      <br />
      <br />
      <br />
      <h1>Your Hard Work Is Appreciated</h1>
      {/* add gif? */}
    </Row>
  );

export default OnMission;
