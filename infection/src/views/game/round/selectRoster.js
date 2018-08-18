import React from 'react';
import { Button } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <div>
    <h2>Set Your Mission Roster</h2>
    {
      team.map((member) => 
        <SelectRosterEntry
          key={member} //change in future
          member={member}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
        ></SelectRosterEntry>)
    }
    <Button 
      bsStyle="danger" 
      bsSize="large" 
      onClick={()=> handleSubmitRoster()}
    >
      SUBMIT ROSTER
    </Button>
  </div>

export default SelectRoster;