import React from 'react';

import Roster from './roster/roster';
import Fail from '../missionResults/fail';
const Round = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  game.rosterApproved[game.rosterApproved.length - 1] === 'fail'
    ? <Fail></Fail>
    : <Roster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Roster>
    
export default Round;
