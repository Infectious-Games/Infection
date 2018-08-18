import React from 'react';

import OnMission from './onMission';
import NotOnMission from './notOnMission';

const Mission = ({ roster, username }) => 
  roster.includes(username)
    ? <OnMission></OnMission>
    : <NotOnMission></NotOnMission>

export default Mission;
  