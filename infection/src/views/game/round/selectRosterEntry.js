import React from 'react';
import { ListGroupItem } from "react-bootstrap";
import '../../../App.css';

const SelectRosterEntry = ({ member, handleSelectRosterEntryClick }) =>
  <ListGroupItem 
    onClick={() => handleSelectRosterEntryClick(member)}
  >
    Team Member {member}
  </ListGroupItem>

export default SelectRosterEntry;