import React from 'react';
import { Button } from 'react-bootstrap';

const OnMission = ({ choose }) => 
  <div>
    <div>
      <h1>WHAT WILL YOU DO?</h1>
    </div>
      <div>
        <Button
          onClick={() => choose('CURE')} 
          bsSize="large"
          bsStyle="success"
        >CURE</Button>
      </div>
      <div>---OR---</div>
    <div>
      <Button
        onClick={() => choose('SABOTAGE')}
        bsSize="large"
        bsStyle="danger"
      >SABOTAGE</Button>
    </div>
  </div>
  

export default OnMission;