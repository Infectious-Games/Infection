import React from 'react';
import { Image } from 'react-bootstrap';
import waiting from '../../../images/waiting.gif';

const Waiting = () => (
  <Image src={waiting} responsive class="img-responsive center-block" />
);

export default Waiting;
