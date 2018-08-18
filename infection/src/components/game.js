import React, { Component} from 'react';

import socket from '../socket';

import Roles from '../views/game/roles/roles';
import Round from '../views/game/round/round';
import Mission from '../views/game/mission/mission';
import MissionResults from '../views/game/missionResults/missionResults';

class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);

    this.state = {
      id: 1,
      username:
        // undefined, 
        'Paul',
      infiltrator:
        undefined, 
        // true,
      round: 1,
      leader: 
        "Paul",
        // undefined,
      team: 
        // [],
        ['Paul', 'Mark', 'Athena', 'Matt'],
      missionRoster: 
      // [],
        ['Paul', 'Mark', 'Athena'],
      missionActive:
        // false,
        true,
      gameResult: undefined, 
      choiceMade: undefined,
      missionResults:
        [undefined, undefined, undefined],
        // ['success', 'fail', undefined],
    }
    
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', (players) => {
      console.log(players, 'players');
    })
    socket.on('start round', (data) => {
      this.setState({ round: data.round, leader: data.leader })
    })
    socket.on('team chosen', (team) => {
      this.setState({ missionRoster: team }, () => {
        console.log(this.state.missionRoster, 'missionRoster updated from server');
      })
    })
    socket.on('mission result', (MissionResults) => {
      this.setState({ MissionResults: MissionResults }, () => {
        console.log(this.state.MissionResults, 'MissionResults from server');
      })
    })
    socket.on('game over', (gameResult) => {
      this.setState({ gameResult: gameResult }, () => {
        console.log(this.state.gameResult, 'gameResult from server');
      })
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
    socket.emit('deploy team', this.state.missionRoster)
    this.setState({ missionActive: true }, () => {
      console.log(this.state.missionActive, 'missionActive');
    });
  }

  handleOnMissionClick(choice) {
    this.setState({choiceMade: choice }, () =>
      console.log(this.state.choiceMade, 'choice' ));
      //send choice to server
  }
  
  render() {
    const game = this.state;

    if (game.round === 0) {
      return <Roles infiltrator={game.infiltrator}></Roles>
    }else {
      if (!game.missionActive) {
        return <Round
          game={game}
          handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
          handleSubmitRoster={this.handleSubmitRoster.bind(this)}
          ></Round>
      } else {
        if (game.missionResults[game.round - 1] === undefined){
          return <Mission
                  choose={this.handleOnMissionClick.bind(this)}
                  choiceMade={game.choiceMade} 
                  roster={game.missionRoster}
                  username={game.username}
                  ></Mission>
        } else {
          return <MissionResults
                  result={game.missionResults[game.round - 1]}
                  ></MissionResults>
        }
      }

      }
  }
}


export default Game;
