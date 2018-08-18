import React from 'react';

const GameStatus = ({ missionResults }) => 
  missionResults.map((round, i) =>
    <div key={i}>
      {
        round === 'success'
        ? <div>Green</div>
        : round === 'fail'
          ? <div>RED</div>
          : <div>Grey</div>
        }
    </div> 
  )


export default GameStatus;