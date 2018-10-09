import React from 'react';
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
      value: '',
      username: '',
      password: '',
    };
  }

  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // }

  handleSignIn(e) {
    e.preventDefault();
    console.log(this.state.username, 'username');
    console.log(this.state.password, 'password');
    // this.props.handleSearchInput(this.state.value);
    // this.setState({ value: '' });

    // const gameParams = {
    //   playerCount: num,
    //   pal3000Active: this.state.pal3000Active,
    // };
    // axios
    //   .post('/start', gameParams)
    //   .then(joinCode => {
    //     console.log(joinCode.data, 'joinCode in handleCreateGame');
    //     this.setState({ newGameCode: joinCode.data });
    //   })
    //   .catch(error => {
    //     console.error(error, 'error creating game in login.js');
    //   });
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
        <FormGroup controlId="formHorizontalUsername">
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

        <FormGroup controlId="formHorizontalPassword">
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
            <Button type="submit">Create Profile</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

// render(<LoginForm />);
export default LoginForm;
