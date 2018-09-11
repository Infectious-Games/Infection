/*eslint-disable*/
const sockets = require('socket.io');
const chalk = require('chalk');
const store = require('./redux/store');
const {
  assignRoles,
  newUser,
  resetUsers,
} = require('./redux/users/actionCreator_users');
const {
  voteYes,
  voteNo,
  resetMissionVotes,
} = require('./redux/teamVotes/actionCreator_teamVotes');
const { restartRounds } = require('./redux/rounds/actionCreator_rounds');
const {
  voteCure,
  voteSabotage,
  resetVotes,
} = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');
const {
  scientistRoundWin,
  infiltratorRoundWin,
  restartGame,
  incrementFail,
  resetFail,
  incrementRound,
} = require('./redux/game/actionCreator_game');
const grid = require('./redux/logic_constants');
const { PAL3000 } = require('./AI');
const gameRooms = require('./gameRooms');
const assignLeader = require('./gameLogicHelpers');
const leaderStorage = require('./leaderOrderStorage');
const db = require('./database');

const log = console.log;

module.exports = server => {
  const io = sockets(server);

  db.superTeam('Athena Turek-Hankins', 999, 890, 1889, 'top-secret');
  db.superTeam('Mark Stark', 1234, 345, 1579, 'illuminati');
  db.superTeam('Matthew Reid', 99, 50, 149, 'secret');
  db.superTeam('Paul Marinaro', 10000123, 6, 10000129, 'illuminati');

  io.on('connection', socket => {
    socket.on('join game', playerProps => {
      const game = playerProps.game.toUpperCase();
      const dbGameID = gameRooms[game].dbGameID;
      const { username } = playerProps;
      socket.game = game;
      socket.username = username;
      db.palActive(dbGameID, palActive => {
        // if PAL3000 is active and has not already been added
        if (palActive && !gameRooms[socket.game].pal3000) {
          // add PAL to the game
          store.dispatch(newUser(game, 'PAL3000', 3000));
          // toggle pal3000
          gameRooms[socket.game].pal3000 = true;
        }
      });
      store.dispatch(newUser(game, username, socket.id));
      // SERVER CONNECTS PLAYER TO GAME---------------------------------------
      socket.join(game);
      const getPlayerProfile = () => {
        const playersInGame = store.getState().users[socket.game].users;
        const team = playersInGame.map(user => user.username);
        const infiltrators = [];
        playersInGame.forEach(user => {
          if (user.infiltrator === true) {
            infiltrators.push(user.username);
          }
        });
        playersInGame.forEach(user => {
          if (user.infiltrator === true) {
            user.infiltrators = infiltrators;
          }
          if (user.username === 'PAL3000') {
            // instantiate PAL3000(scientist, team, infiltrators);
            gameRooms[socket.game].pal3000 = new PAL3000(!user.infiltrator, team, infiltrators);
          }
          user.team = team;
          io.to(user.socketID).emit('game start', user);
        });
        setTimeout(() => {
          store.dispatch(incrementRound(socket.game));
          const round = store.getState().game[socket.game].round;
          const rosterLength = grid[gameRooms[socket.game].playerCount][round - 1];
          log(chalk.bold.cyan(rosterLength, 'rosterLength on line 92'));
          const leaderLoop = assignLeader(
            store.getState().users[socket.game].users
          );
          leaderStorage[socket.game] = { index: 0, leaderLoop };
          const roundLeader =
            leaderStorage[socket.game].leaderLoop[
              leaderStorage[socket.game].index
            ];
          leaderStorage[socket.game].index += 1;
          io.in(game).emit('start round', {
            leader: roundLeader.username,
            round,
            rosterLength,
          });
          // if PAL3000 is leader
          if (roundLeader.username === 'PAL3000') {
            gameRooms[socket.game].isLeader = true;
            setTimeout(() => {
              // PAL3000 chooses roster
              gameRooms[socket.game].roster = gameRooms[socket.game].pal3000.chooseMissionRoster(rosterLength);
              io.in(socket.game).emit('team chosen', gameRooms[socket.game].roster);
            }, 5000);
          }
        }, 25000);
      };
      store.getState().users[socket.game].users.length === gameRooms[socket.game].playerCount
        ? store.dispatch(assignRoles(socket.game)) && getPlayerProfile()
        : console.log(
          chalk.bold.cyan(
            'User added. Waiting for more users to start game.'
          )
        );
    });
    // LEADER CHOSE TEAM-------------------------------------------------------
    socket.on('deploy team', team => {
      gameRooms[socket.game].roster = team;
      io.in(socket.game).emit('team chosen', team);
    });
    // CURE OR SABOTAGE CHOSEN-------------------------------------------------
    socket.on('chose cure or sabotage', choice => {
      const round = store.getState().game[socket.game].round;
      choice === 'CURE'
        ? store.dispatch(voteCure(socket.game))
        : store.dispatch(voteSabotage(socket.game));
      // if pal3000 is active and on the mission
      if (gameRooms[socket.game].pal3000 && !gameRooms[socket.game].pal3000.voted && gameRooms[socket.game].roster.includes('PAL3000')) {
        const palChoice = gameRooms[socket.game].pal3000.cureOrSabotage(round, gameRooms[socket.game].roster);
        palChoice === 'CURE'
        ? store.dispatch(voteCure(socket.game))
        : store.dispatch(voteSabotage(socket.game));
        gameRooms[socket.game].pal3000.voted = true;
      }
      const results = store.getState().cureOrSabotage[socket.game].voteStatus;
      const totalVotes = store.getState().cureOrSabotage[socket.game]
        .deployedVoteCount;
      log(chalk.bold.black(store.getState(), 'STORE after vote dispatch'
      ));
      totalVotes === grid[gameRooms[socket.game].playerCount][round - 1] && results === 1
        ? store.dispatch(infiltratorRoundWin(socket.game))
        : console.log(chalk.magenta('not a great day to be a scientist'));
      totalVotes === grid[gameRooms[socket.game].playerCount][round - 1] && results === 0
        ? store.dispatch(scientistRoundWin(socket.game))
        : console.log(chalk.magenta('great day to be a scientist'));
      totalVotes === grid[gameRooms[socket.game].playerCount][round - 1]
        ? io.in(socket.game).emit('mission result', results) &&
          setTimeout(() => { // setTimeout for mission result
            if (gameRooms[socket.game].pal3000) {
              // reset PAL3000's voted status
              gameRooms[socket.game].pal3000.voted = false;
              // send results to PAL
              gameRooms[socket.game].pal3000.updatePlayerRecords(results, gameRooms[socket.game].roster);
            }
            const scientistWinTotal = store.getState().game[socket.game].scientistWins;
            const infiltratorWinTotal = store.getState().game[socket.game].infiltratorWins;  
            let winner;
            if (scientistWinTotal === 3) {
              winner = false;
              // if PAL3000 played, update his stats
              if (gameRooms[socket.game].pal3000) {
                gameRooms[socket.game].pal3000.updateStats(winner);
                // reset PAL for next game
                gameRooms[socket.game].pal3000 = undefined;
              }
              io.in(socket.game).emit('game over', winner);
              // DISCONNECT SOCKET--------------------------------------------
              setTimeout(() => socket.leave(socket.game), 3000);
              store.dispatch(resetUsers(socket.game));
              store.dispatch(restartGame(socket.game));
              store.dispatch(restartRounds(socket.game));
              store.dispatch(resetVotes(socket.game));
              store.dispatch(resetMissionVotes(socket.game));
              gameRooms[socket.game] = {
                playerCount: 0,
                dbGameID: null,
                proposalResults: [],
                pal3000: null,
                roster: null,
              };
            } else if (infiltratorWinTotal === 3) {
              winner = true;
              // if PAL3000 played, update his stats
              if (gameRooms[socket.game].pal3000) {
                gameRooms[socket.game].pal3000.updateStats(winner);
              }
              io.in(socket.game).emit('game over', winner);
              // DISCONNECT SOCKET--------------------------------------------
              setTimeout(() => socket.leave(socket.game), 3000);
              store.dispatch(resetUsers(socket.game));
              store.dispatch(restartGame(socket.game));
              store.dispatch(restartRounds(socket.game));
              store.dispatch(resetVotes(socket.game));
              store.dispatch(resetMissionVotes(socket.game));
              gameRooms[socket.game] = {
                playerCount: 0,
                dbGameID: null,
                proposalResults: [],
                pal3000: null,
                roster: null,
              };
            } else {
              // store.dispatch(incrementRound());
              store.dispatch(resetVotes(socket.game));
              const round = store.getState().game[socket.game].round;
              const rosterLength = grid[gameRooms[socket.game].playerCount][round - 1];
              const roundLeader =
                leaderStorage[socket.game].leaderLoop[
                  leaderStorage[socket.game].index
                ];
              io.in(socket.game).emit('start round', {
                leader: roundLeader.username,
                round,
                rosterLength,
              });
              leaderStorage[socket.game].index += 1;
              if (roundLeader.username === 'PAL3000') {
                gameRooms[socket.game].pal3000.isLeader = true;
                setTimeout(() => {
                  // PAL3000 chooses roster
                  gameRooms[socket.game].roster = gameRooms[socket.game].pal3000.chooseMissionRoster(rosterLength);
                  io.in(socket.game).emit('team chosen', gameRooms[socket.game].roster);
                }, 5000);
              }
            }
          }, 5000)
        : console.log(chalk.red('Waiting for more votes'));
    });

    // PLAYERS VOTE YES OR NO ON LEADER'S MISSION ROSTER SELECTION------------
    socket.on('chose YES or NO', ({ vote, username }) => {
      console.log(gameRooms[socket.game], 'gameRooms[socket.game]');
      if (gameRooms[socket.game].pal3000 && !gameRooms[socket.game].pal3000.voted) {
        const failedRosterVotes = store.getState().game[socket.game].failCount;
        const palVote = gameRooms[socket.game].pal3000.voteForMissionTeam(gameRooms[socket.game].roster, failedRosterVotes);
        // add PAL3000 vote to proposalResults
        gameRooms[socket.game].proposalResults.push({ name: 'PAL3000', vote: palVote });
        palVote === 'YES'
          ? store.dispatch(voteYes(socket.game))
          : store.dispatch(voteNo(socket.game));
        gameRooms[socket.game].pal3000.voted = true;
        gameRooms[socket.game].pal3000.isLeader = false;
      }
      // track each players vote
      gameRooms[socket.game].proposalResults.push({ name: username, vote });
      // increment yes and no votes as individual votes come in
      vote === 'YES' ? store.dispatch(voteYes(socket.game)) : store.dispatch(voteNo(socket.game));
      // If everyone has voted
      if (
        store.getState().proposalVotes[socket.game].totalMissionVotes ===
        gameRooms[socket.game].playerCount
      ) {
        // More accepts than rejects for team proposal
        const voteSucceeds =
          store.getState().proposalVotes[socket.game].voteSuccess >
          store.getState().proposalVotes[socket.game].voteFail;
        let results;
        voteSucceeds === false ? (results = 1) : (results = 0);
        const round = store.getState().game[socket.game].round;
        const rosterLength = grid[gameRooms[socket.game].playerCount][round - 1];
        const roundLeader =
          leaderStorage[socket.game].leaderLoop[
            leaderStorage[socket.game].index
          ];
        // Send roster vote results back to client
        io.in(socket.game).emit('roster vote result', {
          voteSucceeds,
          vote: gameRooms[socket.game].proposalResults,
        });
        // reset PAL3000's voted status
        if (gameRooms[socket.game].pal3000) {
          gameRooms[socket.game].pal3000.voted = false;
        }
        // setTimeout to view roster vote result
        setTimeout(() => {
          // If vote succeeds, reset fail count, mission votes,
          // move to cure or sabotage vote via on mission event
          if (voteSucceeds) {
            store.dispatch(resetMissionVotes(socket.game));
            console.log(
              chalk.bgWhite.blue(
                store.getState().proposalVotes[socket.game].totalMissionVotes,
                'totalMissionVotes after success'
              )
            );
            store.dispatch(resetFail(socket.game));
            gameRooms[socket.game].proposalResults = [];
            io.in(socket.game).emit('on mission');
          } else if (!voteSucceeds) {
            // If vote fails, check if this is third fail on current
            if (store.getState().game[socket.game].failCount === 2) {
              // If this is the third failed vote on current round,
              io.in(socket.game).emit('mission result', results);
              // setTimeout for viewing mission result
              setTimeout(() => {
                const infiltratorWinTotal = store.getState().game[socket.game]
                  .infiltratorWins;
                console.log(chalk.bgYellow.black(infiltratorWinTotal));
                let winner;
                // If this is the third round win for the infiltrators
                // check if the infiltrators already have 2 wins
                if (infiltratorWinTotal === 2) {
                  // Set winner to true for client and emit game over event with infiltrator win
                  winner = true;
                  // if PAL3000 played, update his stats
                  if (gameRooms[socket.game].pal3000) {
                    gameRooms[socket.game].pal3000.updateStats(winner);
                    //pal3000 = undefined;
                  }
                  io.in(socket.game).emit('game over', winner);
                  setTimeout(() => socket.leave(socket.game), 3000);
                  store.dispatch(resetUsers(socket.game));
                  store.dispatch(restartGame(socket.game));
                  store.dispatch(restartRounds(socket.game));
                  store.dispatch(resetVotes(socket.game));
                  store.dispatch(resetMissionVotes(socket.game));
                  gameRooms[socket.game] = {
                    playerCount: 0,
                    dbGameID: null,
                    proposalResults: [],
                    pal3000: null,
                    roster: null,
                  };
                } else {
                  // If this is not the third win for the infiltrators,
                  // reset appropriate state and start new new round
                  store.dispatch(infiltratorRoundWin(socket.game));
                  store.dispatch(resetFail(socket.game));
                  store.dispatch(resetMissionVotes(socket.game));
                  // store.dispatch(incrementRound());
                  const round = store.getState().game[socket.game].round;
                  const rosterLength = grid[gameRooms[socket.game].playerCount][round - 1];
                  gameRooms[socket.game].proposalResults = [];
                  leaderStorage[socket.game].index += 1;
                  io.in(socket.game).emit('start round', {
                    leader: roundLeader.username,
                    round,
                    rosterLength,
                  });
                  if (roundLeader.username === 'PAL3000') {
                    gameRooms[socket.game].pal3000.isLeader = true;
                    setTimeout(() => {
                      // PAL3000 chooses roster
                      gameRooms[socket.game].roster = gameRooms[socket.game].pal3000.chooseMissionRoster(rosterLength);
                      io.in(socket.game).emit('team chosen', gameRooms[socket.game].roster);
                    }, 5000);
                  }
                }
              }, 5000);
            } else {
              // If this is not the third failed vote, reset mission votes,
              // increment fail, assign new leader, wait for next proposal
              store.dispatch(incrementFail(socket.game));
              store.dispatch(resetMissionVotes(socket.game));
              gameRooms[socket.game].proposalResults = [];
              leaderStorage[socket.game].index += 1;
              io.in(socket.game).emit('start round', {
                leader: roundLeader.username,
                round,
                rosterLength,
              });
              if (roundLeader.username === 'PAL3000') {
                gameRooms[socket.game].pal3000.isLeader = true;
                setTimeout(() => {
                  // PAL3000 chooses roster
                  gameRooms[socket.game].roster = gameRooms[socket.game].pal3000.chooseMissionRoster(rosterLength);
                  io.in(socket.game).emit('team chosen', gameRooms[socket.game].roster);
                }, 5000);
              }
            }
          }
        }, 5000);
      } else {
        console.log(chalk.bgCyan.red('Waiting for votes '));
      }
    });
    socket.on('disconnect', () => {
      if (socket.game) {
        const game = socket.game;
        io.in(game).emit('game over');
        setTimeout(() => {
          io.of('/').in(game).clients((error, socketIds) => {
          if (error) {
            console.error(error);
          } else {
            socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(game));
          }
        });
          store.dispatch(resetUsers(game));
          store.dispatch(restartGame(game));
          store.dispatch(restartRounds(game));
          store.dispatch(resetVotes(game));
          store.dispatch(resetMissionVotes(game));
          gameRooms[game] = {
            playerCount: 0,
            dbGameID: null,
            proposalResults: [],
            pal3000: null,
            roster: null,
          };
        }, 3000);
      }
    });
  });
};
