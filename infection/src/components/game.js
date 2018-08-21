import React, { Component} from 'react';

import socket from '../socket';

import GameView from '../views/game/gameView';

class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);

    this.state = {
      
      choiceMade: undefined,
      gameOver: false, 
      id: undefined,
      infiltrator: false,
      infiltrators: [],
      leader: undefined,
      missionActive: false,
      missionResults: [undefined, undefined, undefined],
      missionRoster: [],
      round: 0,
      scientistsWin: true,
      team: [],
      teamAssembled: false,
      username: undefined,
      
    }
    
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', ({username, infiltrator, team}) => {
      this.setState({ username, teamAssembled: true, infiltrator, team }, () => {
      })
    })
    socket.on('start round', (data) => {
      this.setState({ round: data.round, leader: data.leader, missionRoster: [], missionActive: false, 
        choiceMade: undefined })
    })
    socket.on('team chosen', (team) => {
      this.setState({ missionRoster: team , missionActive: true})
    })
    socket.on('mission result', (result) => {
      if (result === 0) {
        result = 'success'
      } else if (result === 1) {
        result = 'fail'
      }
      const updatedResults = this.state.missionResults.map((current, i) => {
        if (i === this.state.round - 1) {
          return result;
        } else {
          return current;
        }
      }) 
      this.setState({ missionResults: updatedResults });
    })
    socket.on('game over', (winner) => {
      console.log(winner, 'winner in client');
      this.setState({ gameOver: true, scientistsWin: winner }, () => {
        console.log('gameOver:', this.state.gameOver, 'winner:', winner, 'true: scientists, false: infiltrators FROM SERVER');
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
    this.setState({ missionActive: true });
  }

  handleOnMissionClick(choice) {
    this.setState({choiceMade: choice }, () =>
      socket.emit('chose cure or sabotage', choice)
    );
  }
  
  render() {
    return (
      <GameView 
        game={this.state}
        handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
        handleSubmitRoster={this.handleSubmitRoster.bind(this)}
        choose={this.handleOnMissionClick.bind(this)}
      ></GameView>
    );
  }
}


export default Game;
