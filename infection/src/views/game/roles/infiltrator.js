import React from 'react';
import { Image, Grid } from 'react-bootstrap';

import infiltrator from '../../../images/Infiltrator-Card.png';

const Infiltrator = ({ infiltrators }) => 
  <Grid>
    <Image src={infiltrator} responsive></Image>
    {infiltrators.map(infiltrator => <div key={infiltrator}>{infiltrator}</div>)}
  </Grid>

  export default Infiltrator;
  