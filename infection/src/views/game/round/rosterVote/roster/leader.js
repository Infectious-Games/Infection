import React from 'react';
import { Row, Col } from 'react-bootstrap';


import SelectRoster from './selectRoster';

const Leader = ({ 
  team, 
  handleSelectRosterEntryClick, 
  handleSubmitRoster,
  rosterLength, 
}) => 
    <Row>
      <h3>Congratulations Leader</h3>
      <h5>Select {rosterLength} Scientists For Mission Roster</h5>
      <Col md={4}></Col>
      <Col md={4}>
        <SelectRoster 
          team={team}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
          handleSubmitRoster={handleSubmitRoster}
        ></SelectRoster>
      </Col>
      <Col md={4}></Col>
    </Row>

export default Leader;