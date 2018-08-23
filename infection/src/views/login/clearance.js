import React from 'react';
import { Row } from 'react-bootstrap';

const Clearance = ({ clearance }) => {
  return <Row
    className={clearance + ' clearance-lvl'}
  >{clearance.toUpperCase()} CLEARANCE LEVEL</Row>
      

}

export default Clearance;