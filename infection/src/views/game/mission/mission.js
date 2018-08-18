import React from 'react';

import OnMission from './onMission';
import NotOnMission from './notOnMission';

const Mission = ({ roster, username, choose }) => 
  roster.includes(username)
    ? <OnMission choose={choose}></OnMission>
    : <NotOnMission></NotOnMission>

export default Mission;
  