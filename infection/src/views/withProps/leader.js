import React from 'react';

import SelectRoster from './selectRoster';

const Leader = ({ team }) => 
  <div>
    <h1>Congratulations You are Leader</h1>
    <SelectRoster team={team}></SelectRoster>
  </div>

export default Leader;