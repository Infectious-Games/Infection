import React from 'react';

import Leader from '../leader';
import NotLeader from '../notLeader';

const Roster = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) =>
  game.leader === game.username
    ? <Leader
      team={game.team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Leader>
    : <NotLeader leader={game.leader}></NotLeader>

export default Roster;