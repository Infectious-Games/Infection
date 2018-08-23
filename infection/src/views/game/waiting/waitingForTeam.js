import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Waiting from './waiting';


const WaitingForTeam = () => 
    <Grid className="waitingForTeam">
      <Row className="waitingForTeamTitle">
      <Col md={8}><h1>Please Wait for the Team to Assemble</h1></Col>
      </Row>
      <Row className="waiting-img">
        <Col md={8}>
          <Waiting></Waiting>
        </Col>
      </Row>
    </Grid>
 
export default WaitingForTeam;