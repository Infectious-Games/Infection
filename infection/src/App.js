import React, { Component } from 'react';
import './App.css';
import Welcome from './views/login/welcome';
import Game from './components/game';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
    loggedIn: 
    // true,
    false,
    }
  }
//pass a function to login to set state.
  login() {
    this.setState({ loggedIn: !this.state.loggedIn });
    //this should be handled in the store
  }
  render() {
    return (
      <div className="App">{
        this.state.loggedIn
          ? <Game></Game>
          : <Welcome login={this.login.bind(this)}></Welcome>
      }
      </div>
    )
  }
}


export default App;
