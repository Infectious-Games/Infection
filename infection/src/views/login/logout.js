import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = () => (
  <Button href="/logout" bsStyle="info" bsSize="medium" active>
    Logout
  </Button>
);

export default Logout;
