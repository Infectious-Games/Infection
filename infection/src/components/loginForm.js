import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Col,
  Button,
} from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
      authFail: false,
    };
  }

  getValidationState() {
    const { authFail } = this.state;
    if (authFail) {
      // if (this.state.authFail) {
      return 'error';
    }
    return null;
  }

  handleSignIn(e) {
    e.preventDefault();
    const { username } = this.state;
    const { password } = this.state;
    // check to see if user is already in db
    axios
      .get(`/user?username=${username}&password=${password}`)
      .then(response => {
        // if there is no user with those credentials
        if (!response.data.length) {
          this.setState({ authFail: true });
        } else {
          // log in user
          this.props.setLoggedIn(response.data[0]);
        }
      });
  }

  handleCreateProfile(e) {
    e.preventDefault();
    const { username } = this.state;
    const { password } = this.state;
    const credentials = { username, password };
    // check if username & password already exists
    axios
      .get(`/user?username=${username}&password=${password}`)
      .then(response => {
        // if so, prompt user to use a different username
        if (response.data.length) {
          this.setState({ authFail: true });
        } else {
          // otherwise, create user profile
          axios.post('/user', credentials).then(res => {
            // log in user
            this.props.setLoggedIn(res.data);
          });
        }
      });
  }

  handleUsernameInputChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordInputChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup
          controlId="formHorizontalUsername"
          validationState={this.getValidationState()}
        >
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl
              type="username"
              placeholder="Username"
              username={this.state.username}
              onChange={this.handleUsernameInputChange.bind(this)}
            />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalPassword"
          validationState={this.getValidationState()}
        >
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              placeholder="Password"
              password={this.state.password}
              onChange={this.handlePasswordInputChange.bind(this)}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.handleSignIn.bind(this)}>
              Sign in
            </Button>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.handleCreateProfile.bind(this)}>
              Create Profile
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginForm;
