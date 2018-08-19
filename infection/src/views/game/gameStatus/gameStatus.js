import React from 'react';
import { Grid, Col, Row, Button} from 'react-bootstrap';

const GameStatus = ({ missionResults }) => 
  <Grid className="game-results">
    <Row>
      <Col med={4}></Col>
      <Col med={4}>
        <h4>Mission Results</h4>
      </Col>
      <Col med={4}></Col>
    </Row>
    <Row>
        {missionResults.map((round, i) =>
          <Col key={i}>
            {
              round === 'success'
                ? <Button bsStyle="success" bsSize="large" ></Button>
                : round === 'fail'
                  ? <Button bsStyle="danger" bsSize="large" ></Button>
                  : <Button bsStyle="default" bsSize="large" ></Button>
            }
          </Col>
        )}
    </Row>
  </Grid>


export default GameStatus;