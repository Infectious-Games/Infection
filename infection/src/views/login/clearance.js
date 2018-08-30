import React from 'react';
import { Row } from 'react-bootstrap';

const Clearance = ({ clearance }) => (
  <Row className={clearance + ' clearance-lvl'}>
    <Row>{clearance.toUpperCase()}</Row>
  </Row>
);

export default Clearance;
