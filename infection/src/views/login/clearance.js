import React from 'react';
import { Row } from 'react-bootstrap';

const Clearance = ({ clearance }) => (
  <Row className={`${clearance} clearance-lvl`}>
    <h2>{clearance.toUpperCase()}</h2>
  </Row>
);

export default Clearance;
