import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';

const StartGame = ({ setNumOfPlayers, activatePal }) =>
  <Grid>
    <Row>
      <Col md={5}>
        <Row>
          <h4>START A GAME</h4>
        </Row>
        <Row>
          <h5>Select the number of Players for your Game</h5>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col md={1}></Col>
      <Col md={3}>
        <ButtonToolbar>
            <ButtonGroup>
              {[4, 5, 6, 7, 8, 9, 10].map(num => 
                <Button
                  onClick={()=> setNumOfPlayers(num)}
                  key={num}
                  active
                >{num}</Button>)}
            </ButtonGroup>
        </ButtonToolbar>
        <br></br>
        <Row>
          <Col md={1}>
            <Button
            onClick={() => activatePal()}
            active
            >
              Pal3k
            </Button>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Col>
      <Col md={1}></Col>
    </Row>
  </Grid>

export default StartGame;