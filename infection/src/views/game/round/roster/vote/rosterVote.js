import React from 'react';

import Roster from '../roster';
import Vote from './vote';

const RosterVote = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) =>
  !game.team
    ? <Roster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Roster>
    : <Vote></Vote>
  

export default RosterVote;