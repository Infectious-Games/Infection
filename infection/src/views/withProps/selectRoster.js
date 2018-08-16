import React from 'react';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick }) => 
  team.map(member => 
    <SelectRosterEntry 
      member={member}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
    ></SelectRosterEntry>)

export default SelectRoster;