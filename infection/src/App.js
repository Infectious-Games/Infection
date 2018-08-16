import React, { Component } from 'react';
import './App.css';
import Welcome from './views/withProps/welcome';
import Game from './components/hasState/game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    loggedIn: false,
    }
  }
//pass a function to login to set state.
  render() {
    return (
      <div className="App">{
        this.state.loggedIn
          ? <Game game={this.props} ></Game>
          : <Welcome login={this.props}></Welcome>
      }
      </div>
    )
  }
}


export default App;
