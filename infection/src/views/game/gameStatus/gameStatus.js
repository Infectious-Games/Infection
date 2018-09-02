/*eslint-disable*/
import React from 'react';
import { Row, Image } from 'react-bootstrap';

import success from '../../../images/beaker-green.png';
import fail from '../../../images/beaker-red.png';
import undecided from '../../../images/beaker-empty.png';

const GameStatus = ({ missionResults }) => (
  <Row>
    <h4>Mission Results</h4>
    {missionResults.map((round, i) => {
      round === 'success'
        ? (round = success)
        : round === 'fail'
          ? (round = fail)
          : (round = undecided);
      return <Image src={round} height={50} width={31} key={i} />;
    })}
  </Row>
);

export default GameStatus;
