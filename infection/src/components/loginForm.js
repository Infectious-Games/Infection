import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  // HelpBlock,
  Form,
  Col,
  Button,
} from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      // value: '',
      username: '',
      password: '',
      authFail: false,
    };
  }

  getValidationState() {
    // const length = this.state.value.length;
    // if (length > 10) return 'success';
    // else if (length > 5) return 'warning';
    // else if (length > 0) return 'error';
    if (this.state.authFail) {
      return 'error';
    }
    return null;
  }

  handleSignIn(e) {
    e.preventDefault();
    console.log(this.state.username, 'username');
    console.log(this.state.password, 'password');
    // this.setState({ username: '', password: '' });
    const { username } = this.state;
    const { password } = this.state;
    // const credentials = { username, password };
    // check to see if user is already in db
    axios
      .get(`/user?username=${username}&password=${password}`)
      // , {
      // params: { credentials },
      // })
      .then(response => {
        console.log(response.data, 'response.data in loginForm 52');
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
    console.log(this.state.username, 'username');
    console.log(this.state.password, 'password');
    // this.setState({ username: '', password: '' });
    const { username } = this.state;
    const { password } = this.state;
    const credentials = { username, password };
    // check if username & password already exists
    axios
      .get(`/user?username=${username}&password=${password}`)
      .then(response => {
        console.log(response.data, 'response.data in loginForm 77');
        // if so, prompt user to use a different username
        if (response.data.length) {
          this.setState({ authFail: true });
        } else {
          // otherwise, create user profile
          axios.post('/user', credentials).then(res => {
            console.log(res.data, 'res.data in loginForm 84');
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
      // <form>
      //   <FormGroup
      //     controlId="formBasicText"
      //     validationState={this.getValidationState()}
      //   >
      //     <ControlLabel>Working example with validation</ControlLabel>
      //     <FormControl
      //       type="text"
      //       value={this.state.value}
      //       placeholder="Enter text"
      //       onChange={this.handleChange}
      //     />
      //     <FormControl.Feedback />
      //     <HelpBlock>Validation is based on string length.</HelpBlock>
      //   </FormGroup>
      // </form>
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

        {/* <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup> */}

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

// render(<LoginForm />);
export default LoginForm;
