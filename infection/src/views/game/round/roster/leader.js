import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


import SelectRoster from '../selectRoster';

const Leader = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <Grid>
    <Row>
      <Col md={8}>
        <h1>Congratulations You are Leader</h1>
        <h2>Set Your Mission Roster</h2>
        <SelectRoster 
          team={team}
          handleSelectRosterEntryClick={handleSelectRosterEntryClick}
          handleSubmitRoster={handleSubmitRoster}
        ></SelectRoster>
      </Col>
    </Row>
  </Grid>

export default Leader;