import React from 'react';

import Leader from './leader';
import NotLeader from './notLeader';

const Roster = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) =>
  game.leader === game.username ? (
    <Leader
      rosterLength={game.rosterLength}
      team={game.team}
      roster={game.missionRoster}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    />
  ) : (
    <NotLeader leader={game.leader} />
  );

export default Roster;
