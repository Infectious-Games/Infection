import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

const UsersVoteOnRosterList = ({ usersVoteRecord }) =>
  <Grid>
    <Row>
      <Col md={8}>
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
      </Col>
    </Row>
  </Grid>

export default UsersVoteOnRosterList;