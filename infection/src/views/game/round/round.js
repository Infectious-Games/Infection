import React from 'react';

import RosterVote from './roster/vote/rosterVote';
import Fail from '../missionResults/fail';

const Round = ({ 
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  handleRosterVote, 
}) => 
  game.rosterApproved[game.rosterApproved.length - 1] === 'X'
    ? <Fail></Fail>
    : <RosterVote
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
      handleRosterVote={handleRosterVote}
    ></RosterVote>
    
export default Round;
