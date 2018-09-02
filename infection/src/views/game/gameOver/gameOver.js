import React from 'react';
import ScientistsWin from './scientistsWin';
import InfiltratorsWin from './infiltratorsWin';
// a small change
const GameOver = ({ infiltratorsWin }) =>
  infiltratorsWin ? <InfiltratorsWin /> : <ScientistsWin />;

export default GameOver;
