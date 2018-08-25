import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import logo from '../../../images/Infection-Fav.png';
import VoteStatus from '../voteStatus/voteStatus';

const Header = () => 
  <Image src={logo} width={64} height={64} />
  
export default Header;