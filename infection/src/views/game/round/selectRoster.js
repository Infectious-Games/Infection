import React from 'react';
import { Button } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <div>
    <h2>Set Your Mission Roster</h2>
    {
      team.map((member, i) => 
        <SelectRosterEntry
          key={i} //change in future
          member={member}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
        ></SelectRosterEntry>)
    }
    <Button 
      bsStyle="danger" 
      bsSize="large" 
      onClick={()=> handleSubmitRoster()}
    >
      SUMBIT ROSTER
    </Button>
  </div>

export default SelectRoster;