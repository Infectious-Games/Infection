import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import InfiltratorListEntry from './infiltratorListEntry';

const InfiltratorList = ({ infiltrators }) =>
  <Grid>

    <Row>
      <Col md={8}>
      <h4>
        Your Co-Conspiritors!
      </h4>
      <Row>
        {
          infiltrators.map(infiltrator =>
          <InfiltratorListEntry  
            key={infiltrator}
            infiltrator={infiltrator}
          ></InfiltratorListEntry>)
        }
      </Row>
      </Col>
    </Row>
  </Grid>

export default InfiltratorList;
