import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import logo from '../../../images/Infection-Fav.png';


const Header = () => 
    <Row className="header">
      <Col md={5}></Col>
      <Col md={2}>
      <Image src={logo} width={64} height={64} />
      </Col>
      <Col md={5}></Col>
    </Row>
  
export default Header;