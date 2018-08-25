import React from 'react';
import { Grid, Col, Row, Button, ListGroup } from 'react-bootstrap';

import SelectRosterEntry from './selectRosterEntry';

const SelectRoster = ({ team, handleSelectRosterEntryClick, handleSubmitRoster }) => 
  <Grid>
    <Row>
      <Col md={8}>
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
        </Row>
        <Row>
          <Button 
            bsStyle="danger" 
            bsSize="large" 
            onClick={handleSubmitRoster}
          >
            SUBMIT ROSTER
          </Button>
        </Row>
      </Col>
    </Row>
  </Grid>

export default SelectRoster;