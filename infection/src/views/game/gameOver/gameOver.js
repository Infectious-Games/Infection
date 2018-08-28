import React from 'react';
import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ infiltratorsWin }) =>
  infiltratorsWin
    ? <TerroristsWin></TerroristsWin>
    : <ScientistsWin></ScientistsWin>
          

export default GameOver;