import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import Waiting from '../../waiting/waiting';
import Vote from './vote';

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
    : <Vote
      handleRosterVote={handleRosterVote}
      leader={leader}
      missionRoster={missionRoster}
      ></Vote>


export default RosterVote;