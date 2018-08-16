import React from 'react';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick }) => 
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
  </div>

export default SelectRoster;