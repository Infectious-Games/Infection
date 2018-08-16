import React from 'react';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick }) => 
  team.map((member, i) => 
    <SelectRosterEntry
      key={i} //change in future
      member={member}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
    ></SelectRosterEntry>)

export default SelectRoster;