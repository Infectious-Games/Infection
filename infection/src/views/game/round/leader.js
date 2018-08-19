import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


import SelectRoster from './selectRoster';

const Leader = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <Grid>
    <Row>
      <Col med={12}>
        <h1>Congratulations You are Leader</h1>
      </Col>
    </Row>
    <Row>
      <Col med={12}>
        <h2>Set Your Mission Roster</h2>
      </Col>
    </Row>
    <Row>
    <SelectRoster 
      team={team}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
    ></SelectRoster>
    </Row>
  </Grid>

export default Leader;