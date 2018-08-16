import React from 'react';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team }) => {
  console.log(team);
  return team.map(member => <SelectRosterEntry member={member}></SelectRosterEntry>)
};

export default SelectRoster;