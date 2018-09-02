import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const Vote = ({ handleRosterVote, leader, missionRoster }) => (
  <Row>
    <h3>{leader} Has Selected</h3>
    <Col md={4} xs={3} />
    <Col md={4} xs={6}>
      <ListGroup>
        {missionRoster.map(member => (
          <ListGroupItem key={member}>{member}</ListGroupItem>
        ))}
      </ListGroup>
      <h3>Do you approve?</h3>
      <Button
        onClick={() => handleRosterVote('YES')}
        bsSize="large"
        bsStyle="success"
      >
        Y
      </Button>
      <Row>---OR---</Row>
      <Button
        onClick={() => handleRosterVote('NO')}
        bsSize="large"
        bsStyle="danger"
      >
        N
      </Button>
    </Col>
    <Col md={4} xs={3} />
  </Row>
);

export default Vote;
