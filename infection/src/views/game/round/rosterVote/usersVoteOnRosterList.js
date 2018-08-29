import React from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const UsersVoteOnRosterList = ({ usersVoteRecord }) =>
  <Row>
    <h4>How the Team Voted</h4>
    <Col md={4}></Col>
    <Col md={4}>
      <ListGroup>
        {usersVoteRecord.map(user => {
          return <ListGroupItem
                  key={user.name}
                >
                {user.name} voted {user.vote}
                </ListGroupItem>
        })}
      </ListGroup>
    </Col>
    <Col md={4}></Col>
  </Row>

export default UsersVoteOnRosterList;