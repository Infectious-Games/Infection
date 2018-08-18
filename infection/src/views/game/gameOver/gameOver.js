import React from 'react';

import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ scientistsWin }) => 
  scientistsWin
    ? <ScientistsWin></ScientistsWin>
    : <TerroristsWin></TerroristsWin>



export default GameOver;