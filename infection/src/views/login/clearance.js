import React from 'react';
import { Row } from 'react-bootstrap';
import Header from '../game/shared/header';

const Clearance = ({ clearance }) => (
  <Row className={clearance + ' clearance-lvl'}>
    <br />
    <Header />
    <Row>{clearance.toUpperCase()}</Row>
  </Row>
);

export default Clearance;
