import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';


const Vote = ({ 
  missionRoster,
  leader,
  handleRosterVote, 
}) =>
  <Grid>
    <Row>
      <Col md={8}>
        <h2>
          {leader} selects the following for mission
        </h2>
        <br></br>
        <ListGroup>
          {
            missionRoster.map(member => 
              <ListGroupItem
                key={member}
              >
                {member}
              </ListGroupItem>
            )
          }
        </ListGroup>
        <br></br>
        <h2>Do you approve?</h2>
        <br></br>
        <Row>
          <Button
            onClick={() => handleRosterVote('YES')}
            bsSize="large"
            bsStyle="success"
          >YES</Button>
        </Row>
        <br></br>
        <Row>
          ---OR---
            </Row>
        <br></br>
        <Row>
          <Button
            onClick={() => handleRosterVote('NO')}
            bsSize="large"
            bsStyle="danger"
          >NO</Button>
        </Row>
      </Col>
    </Row>
  </Grid>
  

export default Vote;