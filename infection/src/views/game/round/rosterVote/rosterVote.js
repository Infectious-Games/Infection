import React from 'react';

import UsersVoteOnRosterList from './usersVoteOnRosterList';
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
  votedOnRoster ? (
    allUsersVotedOnRoster ? (
      <UsersVoteOnRosterList usersVoteRecord={usersVoteRecord} />
    ) : (
      <WaitingForRosterVote />
    )
  ) : (
    <Vote
      handleRosterVote={handleRosterVote}
      leader={leader}
      missionRoster={missionRoster}
    />
  );

export default RosterVote;
