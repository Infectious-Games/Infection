import React, { Component} from 'react';
import Roles from '../withProps/roles';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //game stuff
    }
  }
  render() {
    return <div>Gimme some props
      <Roles></Roles>
    </div>
  }
}


export default Game;
