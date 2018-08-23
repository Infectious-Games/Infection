import React from 'react';

import RosterVote from './roster/vote/rosterVote';
import Fail from '../missionResults/fail';

const Round = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  game.rosterApproved[game.rosterApproved.length - 1] === 'fail'
    ? <Fail></Fail>
    : <RosterVote
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></RosterVote>
    
export default Round;
