import React, { Component} from 'react';

import socket from '../socket';

import Roles from '../views/game/roles/roles';
import Round from '../views/game/round/round';
import Mission from '../views/game/mission/mission';
import MissionResults from '../views/game/missionResults/missionResults';
import WaitingForTeam from '../views/game/waitingForTeam/waitingForTeam';
import GameOver from '../views/game/gameOver/gameOver';
import GameStatus from '../views/game/gameStatus/gameStatus';



class Game extends Component {
  constructor(props) {
    super(props);

    this.checkGameStatus = this.checkGameStatus.bind(this);

    this.state = {
      id: undefined,
      username:
        undefined, 
        // 'Paul',
      infiltrator:
        false, 
        // true,
      round: 0,
      leader: 
        // "Paul",
        undefined,
      teamAssembled: 
      false,
      // true,
      team: 
        [],
        // ['Paul', 'Mark', 'Athena', 'Matt'],
      missionRoster: 
      [],
        // ['Paul', 'Mark', 'Athena'],
      missionActive:
        false,
        // true,
      gameOver: 
      // true,
      false, 
      choiceMade: undefined,
      missionResults:
        [undefined, undefined, undefined],
        // ['success', 'fail', undefined],
      scientistsWin:
        true,
        // false,
    }
    
  }
  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    socket.on('game start', ({username, infiltrator, team}) => {
      console.log('PLAYER INFO: username:', username, 'infiltrator:', infiltrator, 'team:', team);
      this.setState({ username, teamAssembled: true, infiltrator, team }, () => {
      })
    })
    socket.on('start round', (data) => {
      console.log('START ROUND:', data);
      this.setState({ round: data.round, leader: data.leader, missionRoster: [], missionActive: false, 
        choiceMade: undefined })
    })
    socket.on('team chosen', (team) => {
      this.setState({ missionRoster: team , missionActive: true}, () => {
        console.log(this.state.missionRoster, this.state.missionActive, 'missionRoster and missionActive updated from server');
      })
    })
    socket.on('mission result', (result) => {
      if (result === 0) {
        result = 'success'
      } else if (result === 1) {
        result = 'fail'
      }
      // let index = this.state.missionResults.indexOf(undefined);
      const updatedResults = this.state.missionResults.map((current, i) => {
        console.log(current, 'current');
        if (i === this.state.round - 1) {
          return result;
        } else {
          return current;
        }
      }) 
      this.setState({ missionResults: updatedResults }, () => {
        console.log(this.state.missionResults, 'missionResults updated');
      })
    })
    socket.on('game over', (winner) => {
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
    this.setState({ missionActive: true }, () => {
      console.log(this.state.missionActive, 'missionActive');
    });
  }

  handleOnMissionClick(choice) {
    this.setState({choiceMade: choice }, () =>
      socket.emit('chose cure or sabotage', choice)
    );
  }
  
  render() {
    const game = this.state;

    return <div>
            <div>
              {
                !game.teamAssembled
                ? <WaitingForTeam></WaitingForTeam>
                : game.round === 0
                  ? <Roles infiltrator={game.infiltrator}></Roles>
                  : !game.missionActive
                    ? <Round
                      game={game}
                      handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
                      handleSubmitRoster={this.handleSubmitRoster.bind(this)}
                    ></Round>
                    : game.missionResults[game.round - 1] === undefined
                      ? <Mission
                        choose={this.handleOnMissionClick.bind(this)}
                        choiceMade={game.choiceMade}
                        roster={game.missionRoster}
                        username={game.username}
                      ></Mission>
                      : !game.gameOver
                        ? <MissionResults
                          result={game.missionResults[game.round - 1]}
                        ></MissionResults>
                        : <GameOver scientistsWin={game.scientistsWin}></GameOver>
              }
            </div>
            <div>
              <GameStatus missionResults={game.missionResults}></GameStatus>
            </div>
          </div>
  }
}


export default Game;
