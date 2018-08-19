import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import logo from '../../../images/Infection-Fav.png';


const Header = () => 
    <Row className="header">
      <Col med={5}></Col>
      <Col med={2}>
      <Image src={logo} width={64} height={64} />
      </Col>
      <Col med={5}></Col>
    </Row>
  
export default Header;