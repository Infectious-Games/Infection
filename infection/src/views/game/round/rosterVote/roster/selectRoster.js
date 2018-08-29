import React from 'react';
import { Row, Button, ListGroup } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 

    <Row>
      <ListGroup>
        {
          team.map((member) => 
          <SelectRosterEntry
          active
          key={member} //change in future
          member={member}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
          ></SelectRosterEntry>)
        }
      </ListGroup>
      <Button 
        bsStyle="danger" 
        bsSize="large" 
        onClick={handleSubmitRoster}
      >
        SUBMIT ROSTER
      </Button>
    </Row>
  

export default SelectRoster;