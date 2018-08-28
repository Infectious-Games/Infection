import React from 'react';
import { Image } from 'react-bootstrap';

import logo from '../../../images/Logo-vector.png';

const Header = () => 
  <Image src={logo} width={64} height={64} />
  
export default Header;