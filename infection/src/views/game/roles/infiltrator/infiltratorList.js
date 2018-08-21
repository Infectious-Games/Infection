import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import InfiltratorListEntry from './infiltratorListEntry';

const InfiltratorList = ({ infiltrators }) =>
  <Grid>

    <Row>
      <Col med={4}></Col>
      <Col med={4}>
      <h4>
        Your Co-Conspiritors!
      </h4>
      </Col>
      <Col med={4}></Col>
    </Row>
    <Row>
      <Col med={4}></Col>
      <Col med={4}>
        {
          infiltrators.map(infiltrator =>
          <InfiltratorListEntry  
            key={infiltrator}
            infiltrator={infiltrator}
          ></InfiltratorListEntry>)
        }
      </Col>
      <Col med={4}></Col>
    </Row>
  </Grid>

export default InfiltratorList;
