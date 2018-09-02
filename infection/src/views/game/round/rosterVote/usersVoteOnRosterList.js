import React from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const UsersVoteOnRosterList = ({ usersVoteRecord }) => (
  <Row>
    <h4>How the Team Voted</h4>
    <Col md={4} xs={3} />
    <Col md={4} xs={6}>
      <ListGroup>
        {usersVoteRecord.map(user => (
          <ListGroupItem key={user.name}>
            {user.name} voted {user.vote}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Col>
    <Col md={4} xs={3} />
  </Row>
);

export default UsersVoteOnRosterList;
