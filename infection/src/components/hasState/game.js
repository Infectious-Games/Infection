import React, { Component} from 'react';

import Roles from '../../views/withProps/roles';
import socket from '../../socket';
import { Button } from 'react-bootstrap';


class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);

    this.state = {
      username: this.props.username,
      infiltrator: this.props.infiltrator,
    }
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus(){
    socket.on('game start', (players)=>{
      console.log(players, 'players');
    })
  }

  render() {
    return <div>Gimme some props
      <Roles infiltrator={ this.state.infiltrator }></Roles>
    </div>
  }
}


export default Game;
