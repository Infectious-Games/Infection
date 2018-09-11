import React from 'react';
import {
  Button,
  ButtonGroup,
  Row,
  Image,
  ToggleButton,
  ToggleButtonGroup,
  Col,
} from 'react-bootstrap';

import sparky from '../../images/pal3k.png';

const StartGame = ({ setNumOfPlayers, activatePal }) => (
  <Row>
    <div className="start-game-text">
      <h5>
        <b>START A GAME</b>
      </h5>
    </div>
    <h6 className="lesser">Select The Number Of Players For Your Game</h6>
    <ButtonGroup>
      {[4, 5, 6, 7, 8, 9, 10].map(num => (
        <Button onClick={() => setNumOfPlayers(num)} key={num} active>
          {num}
        </Button>
      ))}
      <br />
      <br />
      <Row>
        <Col md={3} />
        <Col md={6}>
          <ToggleButtonGroup
            align="middle"
            type="checkbox"
            defaultValue={[1, 3]}
          >
            <ToggleButton name="image" value="none">
              <div className="sparky-container zoom">
                <Image onClick={activatePal} src={sparky} height={35} />
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col md={3} />
      </Row>
    </ButtonGroup>
    <br />
    <h6 className="sparky-text">
      <b>Click on PAL-3000 to activate AI</b>
    </h6>
  </Row>
);

export default StartGame;
