import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ 
    scientistsWin ,setInGameStatus 
  }) => 
    <Grid>
      <Row>
        {
          scientistsWin
            ? <ScientistsWin></ScientistsWin>
            : <TerroristsWin></TerroristsWin>
        }
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Button 
            bsStyle="primary"
            onClick={setInGameStatus}
          >
          LEAVE GAME
          </Button>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Grid>



export default GameOver;