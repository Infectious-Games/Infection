import React from 'react';
import ScientistsWin from './scientistsWin';
import InfiltratorsWin from './infiltratorsWin';

const GameOver = ({ infiltratorsWin }) =>
  infiltratorsWin ? <InfiltratorsWin /> : <ScientistsWin />;

export default GameOver;
