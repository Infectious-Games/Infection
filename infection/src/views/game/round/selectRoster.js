import React from 'react';
import { Grid, Col, Row, Button, ListGroup } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <Grid>
    <Row>
      <Col med={5}></Col>
      <Col med={2}>
        <ListGroup>
          {
            team.map((member) => 
            <SelectRosterEntry
            key={member} //change in future
            member={member}
            handleSelectRosterEntryClick={handleSelectRosterEntryClick}
            ></SelectRosterEntry>)
          }
        </ListGroup>
      </Col>
        <Col med={5}></Col>
    </Row>
    <Row>
      <br></br>
    </Row>
    <Row>
      <Col med={12}>
        <Button 
          bsStyle="danger" 
          bsSize="large" 
          onClick={()=> handleSubmitRoster()}
        >
          SUBMIT ROSTER
        </Button>
      </Col>
    </Row>
  </Grid>

export default SelectRoster;