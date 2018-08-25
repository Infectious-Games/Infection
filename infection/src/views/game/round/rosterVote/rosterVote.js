import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import WaitingForRosterVote from '../../waiting/waitingForRosterVote';
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
      : <WaitingForRosterVote></WaitingForRosterVote>
    : <Vote
      handleRosterVote={handleRosterVote}
      leader={leader}
      missionRoster={missionRoster}
      ></Vote>


export default RosterVote;