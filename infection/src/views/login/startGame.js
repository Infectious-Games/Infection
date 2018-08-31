import React from 'react';
import { Button, ButtonGroup, Row, Image } from 'react-bootstrap';

import sparky from '../../images/sparky.png';

const StartGame = ({ setNumOfPlayers, activatePal }) => (
  <Row>
    <h4>
      <b>START A GAME</b>
    </h4>
    <h6 className="lesser">Select The Number Of Players For Your Game</h6>
    <ButtonGroup>
      {[4, 5, 6, 7, 8, 9, 10].map(num => (
        <Button onClick={() => setNumOfPlayers(num)} key={num} active>
          {num}
        </Button>
      ))}
      <div className="sparky-container zoom">
        <Image onClick={activatePal} src={sparky} height={35} />
      </div>
    </ButtonGroup>
    <br />
    <h6 className="sparky-text">
      <b>Click on Sparky to activate AI</b>
    </h6>
  </Row>
);

export default StartGame;
