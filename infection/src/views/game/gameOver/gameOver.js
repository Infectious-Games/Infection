import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ 
  infiltratorsWin,
  setInGameStatus, 
}) =>
    <Row>
        {
          infiltratorsWin
          ? <TerroristsWin></TerroristsWin>
          : <ScientistsWin></ScientistsWin>
        }
      <br></br>
        <Button 
          bsStyle="primary"
          onClick={setInGameStatus}
        >
        LEAVE GAME
        </Button>
    </Row>

export default GameOver;