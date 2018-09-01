import React from 'react';
import { Row, Button } from 'react-bootstrap';

const OnMission = ({ choose, choiceMade }) =>
  !choiceMade ? (
    <Row>
      <h1>What Will You Do?</h1>
      <br />
      <Button onClick={() => choose('CURE')} bsSize="large" bsStyle="success">
        CURE
      </Button>
      <br />
      <br />
      <Row>---OR---</Row>
      <br />
      <Button
        onClick={() => choose('SABOTAGE')}
        bsSize="large"
        bsStyle="danger"
      >
        SABOTAGE
      </Button>
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
