import React from 'react';
import { Grid, Row, Button, Col } from 'react-bootstrap';

const OnMission = ({ choose, choiceMade }) =>
  !choiceMade
    ? <Grid>
        <Row>
          <Col md={8}>
            <h1>WHAT WILL YOU DO?</h1>
            <br></br>
            <Row>
              <Button
                onClick={() => choose('CURE')}
                bsSize="large"
                bsStyle="success"
              >CURE</Button>
            </Row>
            <br></br>
            <Row>
              ---OR---
            </Row>
            <br></br>
            <Row>
              <Button
                onClick={() => choose('SABOTAGE')}
                bsSize="large"
                bsStyle="danger"
              >SABOTAGE</Button>
            </Row>
          </Col>
        </Row>
      </Grid> 
    : <h1>YOUR HARD WORK IS APPRECIATED!</h1>
        
      
        
      
  
export default OnMission;