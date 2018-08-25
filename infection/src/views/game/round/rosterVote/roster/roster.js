import React from 'react';

import Leader from '../roster/leader';
import NotLeader from '../roster/notLeader';

const Roster = ({ 
  game, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
}) =>
  game.leader === game.username
    ? <Leader
      rosterLength={game.rosterLength}
      team={game.team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Leader>
    : <NotLeader leader={game.leader}></NotLeader>

export default Roster;