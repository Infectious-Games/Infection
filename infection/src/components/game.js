import React, { Component } from 'react';
import axios from 'axios';
import socket from '../socket';

import GameView from '../views/game/gameView';

class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);
    this.handleRosterVote = this.handleRosterVote.bind(this);
    this.handleSelectRosterEntryClick = this.handleSelectRosterEntryClick.bind(
      this
    );
    this.handleSubmitRoster = this.handleSubmitRoster.bind(this);
    this.handleOnMissionClick = this.handleOnMissionClick.bind(this);
    this.handleRosterVote = this.handleRosterVote.bind(this);

    this.setInGameStatus = props.setInGameStatus;
    this.setLoggedIn = props.setLoggedIn;

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
      // added missionFailed to track mission failed due to 3rd failed roster vote
      missionFailed: false,
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
      const { round } = this.state;
      if (data.round > round) {
        this.setState({
          rosterUnapproved: 0,
        });
      }
      this.setState({
        round: data.round,
        leader: data.leader,
        rosterLength: data.rosterLength,
        missionRoster: [],
        missionActive: false,
        missionFailed: false,
        choiceMade: false,
        leaderSubmitRoster: false,
        allUsersVotedOnRoster: false,
        usersVoteRecord: [],
        votedOnRoster: false,
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
            const { rosterUnapproved } = this.state;
            this.setState({
              rosterUnapproved: rosterUnapproved + 1,
            });
          }
        }
      );
    });
    // if Leader's proposed roster was approved
    socket.on('on mission', () => {
      this.setState({ missionActive: true });
    });
    socket.on('mission result', result => {
      let missionResult;
      if (result === 0) {
        missionResult = 'success';
      } else if (result === 1) {
        missionResult = 'fail';
        this.setState({ missionFailed: true });
      }
      const { missionResults } = this.state;
      const updatedResults = missionResults.map((current, i) => {
        const { round } = this.state;
        if (i === round - 1) {
          return missionResult;
        }
        return current;
      });
      this.setState({ missionResults: updatedResults });
    });
    socket.on('game over', winner => {
      winner === false || winner === true
        ? this.setState(
            { gameOver: true, infiltratorsWin: winner, missionActive: true },
            () => {
              const { infiltrator, username } = this.state;
              // update user stats
              // if player is an infiltrator and infiltrators have won the game, or
              // if player is a scientist and scientists have won the game
              if ((infiltrator && winner) || (!infiltrator && !winner)) {
                const update = { username, win: true };
                axios.post('/userStats', update).then(res => {
                  // log user back in
                  this.setLoggedIn(res.data[0]);
                });
                // otherwise the player has lost the game
              } else {
                const update = { username, win: false };
                axios.post('/userStats', update).then(res => {
                  // log user back in
                  this.setLoggedIn(res.data[0]);
                });
              }
            }
          )
        : this.setInGameStatus() &&
          this.setState({
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
            // added missionFailed to track mission failed due to 3rd failed roster vote
            missionFailed: false,
            missionResults: [
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
            ],
            missionRoster: [],
            rosterLength: 0,
            round: 0,
            rosterUnapproved: 0,
            team: [],
            teamAssembled: false,
            username: undefined,
            usersVoteRecord: [],
            votedOnRoster: false,
          });
    });
  }

  handleSelectRosterEntryClick(member) {
    const { missionRoster } = this.state;
    const roster = missionRoster;
    roster.includes(member)
      ? this.setState({
          missionRoster: roster.filter(selected => selected !== member),
        })
      : this.setState({ missionRoster: [...roster, member] });
  }

  handleSubmitRoster() {
    const { missionRoster, rosterLength } = this.state;
    missionRoster.length === rosterLength
      ? socket.emit('deploy team', missionRoster)
      : console.log('Not enough people chosen yet.');
  }

  handleOnMissionClick(choice) {
    this.setState({ choiceMade: choice }, () =>
      socket.emit('chose cure or sabotage', choice)
    );
  }

  handleRosterVote(vote) {
    const { username } = this.state;
    socket.emit('chose YES or NO', { vote, username });
    this.setState({ votedOnRoster: true });
  }

  render() {
    return (
      <GameView
        game={this.state}
        handleSelectRosterEntryClick={this.handleSelectRosterEntryClick}
        handleSubmitRoster={this.handleSubmitRoster}
        choose={this.handleOnMissionClick}
        setInGameStatus={this.setInGameStatus}
        handleRosterVote={this.handleRosterVote}
      />
    );
  }
}

export default Game;
