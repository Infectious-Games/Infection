import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import InfiltratorListEntry from './infiltratorListEntry';

const InfiltratorList = ({ infiltrators }) =>
  <Grid>

    <Row>
      <Col md={4}></Col>
      <Col md={4}>
      <h4>
        Your Co-Conspiritors!
      </h4>
      </Col>
      <Col md={4}></Col>
    </Row>
    <Row>
      <Col md={4}></Col>
      <Col md={4}>
        {
          infiltrators.map(infiltrator =>
          <InfiltratorListEntry  
            key={infiltrator}
            infiltrator={infiltrator}
          ></InfiltratorListEntry>)
        }
      </Col>
      <Col md={4}></Col>
    </Row>
  </Grid>

export default InfiltratorList;
