import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const Vote = ({ handleRosterVote, leader, missionRoster }) => (
  <Row>
    <h3>{leader} Has Selected</h3>
    <Col md={4} />
    <Col md={4}>
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
        YES
      </Button>
      <Row>---OR---</Row>
      <Button
        onClick={() => handleRosterVote('NO')}
        bsSize="large"
        bsStyle="danger"
      >
        NO
      </Button>
    </Col>
    <Col md={4} />
  </Row>
);

export default Vote;
