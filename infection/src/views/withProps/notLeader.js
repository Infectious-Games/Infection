import React from 'react';


const NotLeader = ({ game }) => {
  console.log(game);
  return <div>{game.leader} is Leader not You Womp Womp!</div>

};

export default NotLeader;