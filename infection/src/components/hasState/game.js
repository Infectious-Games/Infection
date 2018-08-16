import React, { Component} from 'react';
import io from 'socket.io-client';

import Roles from '../../views/withProps/roles';
import Round from './../../views/withProps/round';

const socket = io();

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      infiltrator: this.props.infiltrator,
      round: 0,
      leader: undefined,
      
    }
  }

  //set up socket listeners. set received data to props
  render() {
    return <div className="game">Gimme some props
    {
      this.state.round < 1 
        ? <Roles infiltrator={this.state.infiltrator}></Roles> 
        : <Round game={this.state}></Round>
      }
    </div>
  }
}


export default Game;
