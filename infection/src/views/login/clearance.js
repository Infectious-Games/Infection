import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';

const Clearance = ({ clearance }) => {
  return <Row
    className={clearance + ' clearance-lvl'}
  >{clearance.toUpperCase()} CLEARANCE LEVEL</Row>
      

}

export default Clearance;