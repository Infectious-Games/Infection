import React from 'react';

import Leader from './leader'; 
import NotLeader from './notLeader';

const Round = ({ game, handleSelectRosterEntryClick, handleSubmitRoster }) => {
  console.log(game, 'game');
  return game.leader === game.username
  ? <Leader 
      team={game.team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></Leader>
  : <NotLeader leader={ game.leader }></NotLeader>

};

export default Round;
