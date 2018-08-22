import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';

const Clearance = ({ clearance }) =>
  <Grid>
    <Row>
      <Col med={2}></Col>
      <Col med={8}>
        <Row>{clearance} Clearance Level</Row>
      </Col>
    </Row>
  </Grid>

export default Clearance;