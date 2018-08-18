import React from 'react';
import { Button } from 'react-bootstrap';

const OnMission = ({ choose, choiceMade }) =>{
  return !choiceMade
    ? <div>
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
    : <div>
        YOUR HARD WORK IS APPRECIATED!
      </div>}
  
export default OnMission;