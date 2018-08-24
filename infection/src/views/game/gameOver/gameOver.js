import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ 
    infiltratorsWin ,setInGameStatus 
  }) => 
    <Grid>
      <Row>
        <Col md={8}>
          <Row>
            {
              infiltratorsWin
              ? <TerroristsWin></TerroristsWin>
              : <ScientistsWin></ScientistsWin>
            }
          </Row>
          <br></br>
          <Row>
            <Button 
              bsStyle="primary"
              onClick={setInGameStatus}
            >
            LEAVE GAME
            </Button>
          </Row>
        </Col>
      </Row>
    </Grid>



export default GameOver;