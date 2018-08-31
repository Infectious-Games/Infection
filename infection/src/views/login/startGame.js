import React from 'react';
import { Button, ButtonGroup, Row, Image } from 'react-bootstrap';

import sparky from '../../images/sparky.png';

const StartGame = ({ setNumOfPlayers, activatePal }) => (
  <Row>
    <h4>START A GAME</h4>
    <h6>Select The Number Of Players For Your Game</h6>
    <ButtonGroup>
      {[4, 5, 6, 7, 8, 9, 10].map(num => (
        <Button onClick={() => setNumOfPlayers(num)} key={num} active>
          {num}
        </Button>
      ))}
      <Image onClick={activatePal} src={sparky} height={30} />
    </ButtonGroup>
    <br />
    <h6>Click on Sparky to activate AI</h6>
  </Row>
);

export default StartGame;
