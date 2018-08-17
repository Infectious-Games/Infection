import React, { Component} from 'react';

import Roles from '../../views/withProps/roles';
import Round from './../../views/withProps/round';
import socket from '../../socket';

class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);

    this.state = {
      username: 
      // this.props.username,
        'Paul',
      infiltrator: 
        this.props.infiltrator,
        // true,
      round: 
      // this.props.round,
        1,
      leader: 
      // this.props.leader,
        "Paul",
      team: 
        // this.props.team,
        ['Paul', 'Mark', 'Athena', 'Matt'],
      missionRoster: this.props.missionRoster || [],
        // ['Paul', 'Mark', 'Athena'],



      
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

  handleSelectRosterEntryClick(member) {
    this.state.missionRoster.length === 3
      ? console.log(this.state.missionRoster)
      : this.state.missionRoster.includes(member)
        ? console.log(this.state.missionRoster)
        : this.setState({ missionRoster: [...this.state.missionRoster, member] });
    
    console.log(this.state.missionRoster);
  }

  
  render() {
    return <div className="game">Gimme some props
    {
      this.state.round < 1 
        ? <Roles infiltrator={this.state.infiltrator}></Roles> 
        : <Round 
            game={this.state}
            handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
          ></Round>
      }
    </div>
  }
}


export default Game;
