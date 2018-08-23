import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ScientistsWin from './scientistsWin';
import TerroristsWin from './terroristsWin';

const GameOver = ({ 
    scientistsWin ,setInGameStatus 
  }) => 
    <Grid>
      <Row>
        <Col md={8}>
          <Row>
            {
              scientistsWin
                ? <ScientistsWin></ScientistsWin>
                : <TerroristsWin></TerroristsWin>
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