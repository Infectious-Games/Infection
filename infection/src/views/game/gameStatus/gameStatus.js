import React from 'react';
import { Grid, Col, Row, Button} from 'react-bootstrap';

const GameStatus = ({ missionResults }) =>
  <Grid className="game-results">
    <Row>
      <Col md={6}>
        <h4>Mission Results</h4>
      </Col>
    </Row>
    <br></br>
    <Row>
      <Col md={1}
        bsStyle='default'
        style={{width: 50}}
        ></Col>
        {missionResults.map((round, i) =>
          <Col md={1} key={i}>
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