/*eslint-disbale*/
import React, { Component } from 'react';
import axios from 'axios';
import socket from '../socket';

import GameView from '../views/game/gameView';

class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);
    this.handleRosterVote = this.handleRosterVote.bind(this);

    this.setInGameStatus = props.setInGameStatus;

    this.state = {
      allUsersVotedOnRoster: false,
      choiceMade: false,
      gameOver: false,
      id: undefined,
      infiltrator: false,
      infiltrators: [],
      infiltratorsWin: false,
      leader: undefined,
      leaderSubmitRoster: false,
      missionActive: false,
      missionResults: [undefined, undefined, undefined, undefined, undefined],
      missionRoster: [],
      rosterLength: 0,
      round: 0,
      rosterUnapproved: 0,
      team: [],
      teamAssembled: false,
      username: undefined,
      usersVoteRecord: [],
      votedOnRoster: false,
    };
  }

  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', ({ username, infiltrator, team, infiltrators }) => {
      this.setState(
        {
          username,
          teamAssembled: true,
          infiltrator,
          team,
          infiltrators,
        },
        () => {}
      );
    });
    socket.on('start round', data => {
      data.round === this.state.round
        ? this.setState({
            round: data.round,
            leader: data.leader,
            rosterLength: data.rosterLength,
            missionRoster: [],
            missionActive: false,
            choiceMade: false,
            leaderSubmitRoster: false,
            allUsersVotedOnRoster: false,
            usersVoteRecord: [],
            votedOnRoster: false,
          })
        : this.setState({
            round: data.round,
            leader: data.leader,
            rosterLength: data.rosterLength,
            missionRoster: [],
            missionActive: false,
            choiceMade: false,
            leaderSubmitRoster: false,
            allUsersVotedOnRoster: false,
            usersVoteRecord: [],
            votedOnRoster: false,
            rosterUnapproved: 0,
          });
    });
    socket.on('team chosen', proposedRoster => {
      this.setState({
        missionRoster: proposedRoster,
        leaderSubmitRoster: true,
      });
    });
    socket.on('roster vote result', ({ voteSucceeds, vote }) => {
      this.setState(
        { allUsersVotedOnRoster: true, usersVoteRecord: vote },
        () => {
          // set state of rosterUnapproved based on result
          // for every failed vote increment by one
          if (!voteSucceeds) {
            this.setState(
              { rosterUnapproved: this.state.rosterUnapproved + 1 },
              () => console.log(this.state, 'this.state line 94 game.js')
            );
          }
        }
      );
    });
    // if Leader's proposed roster was approved
    socket.on('on mission', () => {
      this.setState({ missionActive: true });
    });
    socket.on('mission result', result => {
      if (result === 0) {
        result = 'success';
      } else if (result === 1) {
        result = 'fail';
      }
      const updatedResults = this.state.missionResults.map((current, i) => {
        if (i === this.state.round - 1) {
          return result;
        } else {
          return current;
        }
      });
      this.setState({ missionResults: updatedResults });
    });
    socket.on('game over', winner => {
      this.setState(
        { gameOver: true, infiltratorsWin: winner, missionActive: true },
        () => {
          // update user stats
          // if player is an infiltrator and infiltrators have won the game, or
          // if player is a scientist and scientists have won the game
          if (
            (this.state.infiltrator && winner) ||
            (!this.state.infiltrator && !winner)
          ) {
            const update = { username: this.state.username, win: true };
            axios.post('/userStats', update);
            // otherwise the player has lost the game
          } else {
            const update = { username: this.state.username, win: false };
            axios.post('/userStats', update);
          }
        }
      );
    });
  }
  handleSelectRosterEntryClick(member) {
    const roster = this.state.missionRoster;
    roster.includes(member)
      ? this.setState({
          missionRoster: roster.filter(selected => selected !== member),
        })
      : this.setState({ missionRoster: [...roster, member] });
  }

  handleSubmitRoster() {
    this.state.missionRoster.length === this.state.rosterLength
      ? socket.emit('deploy team', this.state.missionRoster)
      : console.log('Not enough people chosen yet.');
  }

  handleOnMissionClick(choice) {
    this.setState({ choiceMade: choice }, () =>
      socket.emit('chose cure or sabotage', choice)
    );
  }

  handleRosterVote(vote) {
    socket.emit('chose YES or NO', { vote, username: this.state.username });
    this.setState({ votedOnRoster: true });
  }

  render() {
    return (
      <GameView
        game={this.state}
        handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(
          this
        )}
        handleSubmitRoster={this.handleSubmitRoster.bind(this)}
        choose={this.handleOnMissionClick.bind(this)}
        setInGameStatus={this.setInGameStatus}
        handleRosterVote={this.handleRosterVote.bind(this)}
      />
    );
  }
}

export default Game;
