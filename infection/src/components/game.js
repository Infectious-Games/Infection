import React, { Component} from 'react';
import axios from 'axios';

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
      
      choiceMade: false,
      gameOver: false, 
      id: undefined,
      infiltrator: false,
      infiltrators: [],
      infiltratorsWin: false,
      leader: undefined,
      missionActive: false,
      missionResults: [undefined, undefined, undefined, undefined, undefined],
      missionRoster: [],
      rosterLength: 0,
      round: 0,
      rosterApproved: [undefined, undefined, undefined],
      team: [],
      teamAssembled: false,
      username: undefined,
      
    }
    
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', ({username, infiltrator, team, infiltrators}) => {
      console.log(infiltrators);
      this.setState({ 
        username, 
        teamAssembled: true, 
        infiltrator, 
        team, 
        infiltrators 
      }, () => {
      })
    })
    socket.on('start round', (data) => {
      console.log(data, 'data sent at start of round line 51 of game');
      this.setState({ 
        round: data.round, 
        leader: data.leader, 
        rosterLength: data.rosterLength, 
        missionRoster: [], 
        missionActive: false, 
        choiceMade: undefined 
      })
    })
    socket.on('team chosen', (proposedRoster) => {
      console.log(proposedRoster, 'mission roster has made it to the client');
      console.log(this.state.rosterLength, 'current state of roster length when roster hits room')
      this.setState({ missionRoster: proposedRoster }) //TODO: move this state change to after vote approval: missionActive: true
    })
    socket.on('mission result', (result) => {
      if (result === 0) {
        result = 'success'
      } else if (result === 1) {
        result = 'X'
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
      this.setState({ gameOver: true, scientistsWin: winner }, () => {
        console.log('gameOver:', this.state.gameOver, 'winner:', winner, 'true: scientists, false: infiltrators FROM SERVER');
        // update user stats
        console.log(this.state.infiltrator, 'this.state.infiltrator in game');
        // if player is an infiltrator and infiltrators have won the game
        // if player is a scientist and scientists have won the game, or
        if (this.state.infiltrator && !winner || !this.state.infiltrator && winner) {
          const update = {username: this.state.username, win: true}
          axios.post('/userStats', update)
            .then((userStats) => {
              console.log(userStats, 'updated userStats in game');
            })
        // otherwise the player has lost the game    
        } else {
          const update = { username: this.state.username, win: false }
          axios.post('/userStats', update)
            .then((userStats) => {
              console.log(userStats, 'updated userStats in game');
            })
        }
      })
    })
  }

  handleSelectRosterEntryClick(member) {
    this.state.missionRoster.length === this.state.rosterLength
      ? console.log(this.state.missionRoster, this.state.rosterLength, 'mission roster at line 114')
      : this.state.missionRoster.includes(member)
        ? console.log(this.state.missionRoster, this.state.rosterLength, 'mission roster at line 116')
        : this.setState({ missionRoster: [...this.state.missionRoster, member] });
  }

  handleSubmitRoster() {
    socket.emit('deploy team', this.state.missionRoster)
    //this.setState({ missionActive: true });
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
