import React, { Component} from 'react';
import io from 'socket.io-client';

import Roles from '../../views/withProps/roles';

const socket = io();

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      infiltrator: this.props.infiltrator,
    }
  }

  //set up socket listeners. set received data to props
  render() {
    return <div>Gimme some props
      <Roles infiltrator={ this.state.infiltrator }></Roles>
    </div>
  }
}


export default Game;
