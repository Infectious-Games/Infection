import React from 'react';
import { Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const UsersVoteOnRosterList = ({ usersVoteRecord }) =>
  <Row>
    <h3>How the Team Voted</h3>
    <ListGroup>
      {usersVoteRecord.map(user => {
        return <ListGroupItem
                key={user.name}
              >
                Player: {user.name} Vote: {user.vote}
              </ListGroupItem>
      })}
    </ListGroup>
  </Row>

export default UsersVoteOnRosterList;