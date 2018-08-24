import React from 'react';

import Roster from '../roster';
import Vote from './vote';

const RosterVote = ({  
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  handleRosterVote, 
}) =>
    !game.team
      ? <Roster
        game={game}
        handleSelectRosterEntryClick={handleSelectRosterEntryClick}
        handleSubmitRoster={handleSubmitRoster}
      ></Roster>
      : <Vote 
          team={game.team}
          leader={game.leader}
          handleRosterVote={handleRosterVote} 
        ></Vote>
  

export default RosterVote;