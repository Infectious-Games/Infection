import React, { Component} from 'react';

import socket from '../socket';

import Roles from '../views/game/roles/roles';
import Round from '../views/game/round/round';
import Mission from '../views/game/mission/mission';

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
      this.props.leader,
        // "Paul",
      team: 
        // this.props.team || [],
        ['Paul', 'Mark', 'Athena', 'Matt'],
      missionRoster: 
      // this.props.missionRoster || [],
        ['Paul', 'Mark', 'Athena'],
      missionActive:
        // false,
        true,
      missionResults:
        this.props.missionResults || [],
        // ['success', 'fail', undefined],



      
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
  }

  handleSubmitRoster() {
    console.log(this.state.missionRoster);
    //emit this.missionRoster to server
    this.setState({missionActive: true});//? maybe this should be set on the server
    console.log(this.state.missionActive);
    

  }
  
  render() {
    const game = this.state;

    if (game.round === 0) {
      return <Roles infiltrator={this.state.infiltrator}></Roles>
    }else {
      if (!game.missionActive) {
        return <Round
          game={this.state}
          handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
          handleSubmitRoster={this.handleSubmitRoster.bind(this)}
        ></Round>
      } else {
        if (game.missionResults[game.round] === undefined){
          return <Mission 
                  roster={game.missionRoster}
                  username={game.username}
                ></Mission>
        } else {
          return <div>Results</div>
        }
      }

      }
  }
}


export default Game;
