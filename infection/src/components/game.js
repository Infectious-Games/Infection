import React, { Component} from 'react';

import socket from '../socket';

import GameView from '../views/game/gameView';

class Game extends Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.checkGameStatus = this.checkGameStatus.bind(this);
    this.handleRosterVote = this.handleRosterVote.bind(this);

    this.setInGameStatus = props.setInGameStatus;

    this.state = {
      
      choiceMade: true,
      gameOver: true, 
      id: undefined,
      infiltrator: false,
      infiltrators: [],
      leader: 'bob',
      missionActive: false,
      missionResults: [undefined, undefined, undefined, undefined, undefined],
      missionRoster: ['bob', 'jim'],
      round: 1,
      rosterApproved: [undefined, undefined, undefined],
      scientistsWin: false,
      team: ['bob', 'jim'],
      teamAssembled: true,
      username: 'bob',
      
    }
    
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', ({username, infiltrator, team, infiltrators}) => {
      console.log(infiltrators);
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

  handleRosterVote(vote) {
    console.log(vote);
  }
  
  render() {
    return (
      <GameView 
        game={this.state}
        handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
        handleSubmitRoster={this.handleSubmitRoster.bind(this)}
        choose={this.handleOnMissionClick.bind(this)}
        setInGameStatus={this.setInGameStatus}
        handleRosterVote={this.handleRosterVote.bind(this)}
      ></GameView>
    );
  }
}


export default Game;
