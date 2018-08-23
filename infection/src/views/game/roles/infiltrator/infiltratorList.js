import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import InfiltratorListEntry from './infiltratorListEntry';

const InfiltratorList = ({ infiltrators }) =>
  <Grid>

    <Row>
      <Col md={8}>
      <h3>
        This List Has All The Infiltrators!
      </h3>
      <h4>
        Keep it hidden from the others!
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
