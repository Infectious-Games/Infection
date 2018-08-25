import React from 'react';
import { Grid, Col, Row,} from 'react-bootstrap';

const VoteStatus = ({ rosterApproved }) =>
  rosterApproved[0] === 'X'
    ? <Grid className="game-results">
        <Row>
          <Col md={5}>
            Unapproved Rosters
          </Col>
          </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={1}>
            <Row>
              <Col md={1}>{rosterApproved[0]}</Col>
              <Col md={1}>{rosterApproved[1]}</Col>
              <Col md={1}>{rosterApproved[2]}</Col>
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Grid>
    : <div></div>
  


export default VoteStatus;
