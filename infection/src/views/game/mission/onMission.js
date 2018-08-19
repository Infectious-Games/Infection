import React from 'react';
import { Grid, Row, Button } from 'react-bootstrap';

const OnMission = ({ choose, choiceMade }) =>
  !choiceMade
    ? <Grid>
        <Row>
          <br></br>
          <br></br>
        </Row>
        <Row>
          <h1>WHAT WILL YOU DO?</h1>
        </Row>
        <Row>
          <br></br>
          <br></br>
        </Row>
        <Row>
          <Button
            onClick={() => choose('CURE')}
            bsSize="large"
            bsStyle="success"
          >CURE</Button>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          ---OR---
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          <Button
            onClick={() => choose('SABOTAGE')}
            bsSize="large"
            bsStyle="danger"
          >SABOTAGE</Button>
        </Row>
      </Grid> 
    : <Row>
        <h1>
          YOUR HARD WORK IS APPRECIATED!
        </h1>
      </Row>
        
      
  
export default OnMission;