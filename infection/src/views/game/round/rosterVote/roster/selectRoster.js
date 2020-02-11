import React from 'react';
import { Row, Button, ListGroup } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({
  roster,
  team,
  handleSelectRosterEntryClick,
  handleSubmitRoster,
}) => (
  <Row>
    <ListGroup>
      {team.map(member => (
        <SelectRosterEntry
          roster={roster}
          key={member} // change in future
          member={member}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
        />
      ))}
    </ListGroup>
    <Button bsStyle="success" bsSize="large" onClick={handleSubmitRoster}>
      SUBMIT ROSTER
    </Button>
  </Row>
);

export default SelectRoster;
