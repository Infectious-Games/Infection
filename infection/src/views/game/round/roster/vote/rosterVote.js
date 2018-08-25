import React from 'react';

import Roster from '../roster';
import Vote from './vote';

const RosterVote = ({  
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  handleRosterVote, 
}) =>
    // BUG: this happens without submit roster button click
    // game.missionRoster.length === game.rosterLength
  game.leaderSubmitRoster
    ? <Vote
      rosterApproved={game.rosterApproved}
      missionRoster={game.missionRoster}
      leader={game.leader}
      handleRosterVote={handleRosterVote}
      votedOnRoster={game.votedOnRoster}
    ></Vote>
    : <Roster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Roster>
    

export default RosterVote;