import React from 'react';

import SelectRoster from './selectRoster';

const Leader = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <div>
    <h1>Congratulations You are Leader</h1>
    <SelectRoster 
      team={team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></SelectRoster>
  </div>

export default Leader;