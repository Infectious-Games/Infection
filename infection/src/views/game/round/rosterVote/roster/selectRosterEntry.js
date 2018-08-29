import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const SelectRosterEntry = ({ member, roster, handleSelectRosterEntryClick }) =>
  roster.includes(member) ? (
    <ListGroupItem
      onClick={() => handleSelectRosterEntryClick(member)}
      disabled
    >
      Team Member {member}
    </ListGroupItem>
  ) : (
    <ListGroupItem onClick={() => handleSelectRosterEntryClick(member)}>
      Team Member {member}
    </ListGroupItem>
  );

export default SelectRosterEntry;
