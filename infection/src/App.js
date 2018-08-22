import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Game from './components/game';
import { Grid } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.setInGameStatus = this.setInGameStatus.bind(this);
    this.state = {
    inGame: false,
    }
  }
//pass a function to setInGameStatus to set state.
  setInGameStatus() {
    this.setState({ inGame: !this.state.inGame });
    //this should be handled in the store
  }
  render() {
    return (
      <Grid className="App">
        {
          this.state.inGame
            ? <Game
              setInGameStatus={this.setInGameStatus.bind(this)}
              ></Game>
            : <Login setInGameStatus={this.setInGameStatus.bind(this)}></Login>
        }
      </Grid>
    )
  }
}


export default App;
