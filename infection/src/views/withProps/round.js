import React from 'react';

import Leader from './leader'; 
import NotLeader from './notLeader';

const Round = ({ game, handleSelectRosterEntryClick }) => {
  console.log(game);
  return game.leader === game.username
  ? <Leader 
      team={game.team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
    ></Leader>
  : <NotLeader leader={ game.leader }></NotLeader>

};

export default Round;
