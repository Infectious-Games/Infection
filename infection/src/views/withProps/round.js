import React from 'react';

import Leader from './leader'; 
import NotLeader from './notLeader';

const Round = ({ game }) => {
  console.log(game);
  return game.leader === game.username
  ? <Leader game={game}></Leader>
  : <NotLeader leader={ game.leader }></NotLeader>

};

export default Round;
