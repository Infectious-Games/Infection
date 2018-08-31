import React from 'react';
import { Button } from 'react-bootstrap';

const LoginView = () => (
  <Button href="/auth/google" bsStyle="info" bsSize="large" active>
    Login with Google
  </Button>
);

export default LoginView;
