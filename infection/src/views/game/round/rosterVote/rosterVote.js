import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import Waiting from '../../waiting/waiting';

const RosterVote = ({
  allUsersVotedOnRoster,
  handleRosterVote,
  leader,
  missionRoster,
  usersVoteRecord,
  votedOnRoster,
}) =>
  votedOnRoster
    ? allUsersVotedOnRoster
      ? <div>List of User Votes {usersVoteRecord[0].name} {usersVoteRecord[0].vote}</div>
      : <Grid>
        <Row>
          <Col md={8}>
            <h3>YOUR VOTE HAS BEEN RECORDED!</h3>
            <h4>Please wait for the rest of your Team to Vote.</h4>
            <br></br>
            <Waiting></Waiting>
          </Col>
        </Row>
      </Grid>
    : <Grid>
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



export default RosterVote;