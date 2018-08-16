import React from 'react';

import Leader from './leader';

const Round = ({ game }) => {
  console.log(game);
  return game.leader === game.username
  ? <Leader game={game}></Leader>
    : <div>Not Leader</div>

};

export default Round;
