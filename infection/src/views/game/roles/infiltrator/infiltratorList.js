import React from 'react';
import { Row } from 'react-bootstrap';

import InfiltratorListEntry from './infiltratorListEntry';

const InfiltratorList = ({ infiltrators }) =>
  <Row>
    <h4>
      This List Has All The Infiltrators!
    </h4>
    <ul>
      {
        infiltrators.map(infiltrator =>
        <InfiltratorListEntry  
        key={infiltrator}
        infiltrator={infiltrator}
        ></InfiltratorListEntry>)
      }
    </ul>
    <h5>
      Keep this hidden from the others!
    </h5>
  </Row>
  

export default InfiltratorList;
