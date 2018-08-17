import React from 'react';


const SelectRosterEntry = ({ member, handleSelectRosterEntryClick }) => 
  <div onClick={() => handleSelectRosterEntryClick(member)}>
    Team Member {member}
  </div>

export default SelectRosterEntry;