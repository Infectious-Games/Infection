import React from 'react';

import Roster from '../roster';
import Vote from './vote';

const RosterVote = ({  
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  handleRosterVote, 
}) =>
  game.leaderSubmitRoster
    ? <Vote
      rosterApproved={game.rosterApproved}
      missionRoster={game.missionRoster}
      leader={game.leader}
      handleRosterVote={handleRosterVote}
      votedOnRoster={game.votedOnRoster}
      allUsersVotedOnRoster={game.allUsersVotedOnRoster}
      usersVoteRecord={game.usersVoteRecord}
    ></Vote>
    : <Roster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Roster>
    

export default RosterVote;