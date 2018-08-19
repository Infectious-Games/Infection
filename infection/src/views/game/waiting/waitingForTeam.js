import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Waiting from './waiting';


const WaitingForTeam = () => 
    <Grid className="waitingForTeam">
      <Row className="waitingForTeamTitle">
      <Col med={12}><h1>Please Wait for the Team to Assemble</h1></Col>
      </Row>
      <Row className="waiting-img">
        <Col med ={12}>
          <Waiting></Waiting>
        </Col>
      </Row>
    </Grid>
 
export default WaitingForTeam;