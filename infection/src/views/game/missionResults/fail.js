import React from 'react';
import { Row, Image } from 'react-bootstrap';

import fail from '../../../images/Mission-Fail.png';

const Fail = () => 
  <Row>
    <br></br>
    <br></br>
    <Image src={fail} responsive></Image>
  </Row>


export default Fail;