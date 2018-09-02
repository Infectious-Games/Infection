import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const SelectRosterEntry = ({ member, roster, handleSelectRosterEntryClick }) =>
  roster.includes(member) ? (
    <ListGroupItem
      onClick={() => handleSelectRosterEntryClick(member)}
      disabled
    >
      {member}
    </ListGroupItem>
  ) : (
    <ListGroupItem onClick={() => handleSelectRosterEntryClick(member)}>
      {member}
    </ListGroupItem>
  );

export default SelectRosterEntry;
