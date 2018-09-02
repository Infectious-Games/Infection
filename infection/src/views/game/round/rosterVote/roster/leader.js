import React from 'react';
import { Row, Col } from 'react-bootstrap';

import SelectRoster from './selectRoster';

const Leader = ({
  handleSelectRosterEntryClick,
  handleSubmitRoster,
  roster,
  rosterLength,
  team,
}) => (
  <Row>
    <h3>Congratulations Leader</h3>
    <h5>Select {rosterLength} Scientists For The Mission</h5>
    <Col md={4} xs={3} />
    <Col md={4} xs={6}>
      <SelectRoster
        team={team}
        roster={roster}
        handleSelectRosterEntryClick={handleSelectRosterEntryClick}
        handleSubmitRoster={handleSubmitRoster}
      />
      <h6>Selected: {roster.map(member => `*${member}* `)}</h6>
    </Col>
    <Col md={4} xs={3} />
  </Row>
);

export default Leader;
