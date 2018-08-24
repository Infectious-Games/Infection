import React from 'react';

import Roster from '../roster';
import Vote from './vote';

const RosterVote = ({  
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  handleRosterVote, 
}) =>
    game.missionRoster.length === game.rosterLength
    ? <Vote
      rosterApproved={game.rosterApproved}
      missionRoster={game.missionRoster}
      leader={game.leader}
      handleRosterVote={handleRosterVote}
    ></Vote>
    : <Roster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Roster>
    

export default RosterVote;