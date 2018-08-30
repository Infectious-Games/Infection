const sockets = require('socket.io');
const chalk = require('chalk');
const store = require('./redux/store');
const { assignRoles, newUser, resetUsers } = require('./redux/users/actionCreator_users');
const {
  voteYes,
  voteNo,
  resetMissionVotes,
} = require('./redux/teamVotes/actionCreator_teamVotes');
const {
  incrementRound,
  restartRounds,
} = require('./redux/rounds/actionCreator_rounds');
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
} = require('./redux/game/actionCreator_game');
const { Game } = require('./database');
const grid = require('./redux/logic_constants');
const { PAL3000 } = require('./AI');

const assignLeader = require('./gameLogicHelpers');
const leaderStorage = require('./leaderOrderStorage');
const log = console.log;

module.exports = (server) => {
  const io = sockets(server);
  let proposalResults = [];
  let pal3000;
  let roster;

  io.on('connection', socket => {
    socket.on('join game', playerProps => {
      const { game } = playerProps;
      const { username } = playerProps;
      socket.game = game;
      socket.username = username;
      // if PAL3000 is active and has not already been added
      if (playerProps.pal3000Active && !pal3000) {
        // add PAL to the game
        store.dispatch(newUser('PAL3000', game, 3000));
        // toggle pal3000
        pal3000 = true;
      }
      store.dispatch(newUser(username, game, socket.id));
      // SERVER CONNECTS PLAYER TO GAME---------------------------------------
      socket.join(game);
      const getPlayerProfile = () => {
        const playersInGame = store.getState().users.users;
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
            pal3000 = new PAL3000(!user.infiltrator, team, infiltrators);
          }
          user.team = team;
          io.to(user.socketID).emit('game start', user);
        });
        setTimeout(() => {
          store.dispatch(incrementRound());
          const round = store.getState().round.round;
          const rosterLength = grid[socket.numberOfPlayers][round - 1];
          const leaderLoop = assignLeader(store.getState().users.users);
          leaderStorage[socket.game] = { index: 0, leaderLoop };
          const roundLeader =
            leaderStorage[socket.game].leaderLoop[
              leaderStorage[socket.game].index
            ];
          leaderStorage[socket.game].index++;
          io.in(game).emit('start round', {
            leader: roundLeader.username,
            round,
            rosterLength,
          });
          // if PAL3000 is leader
          if (roundLeader.username === 'PAL3000') {
            pal3000.isLeader = true;
            setTimeout(() => {
              // PAL3000 chooses roster
              roster = pal3000.chooseMissionRoster(rosterLength);
              io.in(socket.game).emit('team chosen', roster);
            }, 3000);
          }
        }, 5000);
      };
      Game.find({ where: { id: game } })
        .then(game => {
          socket.numberOfPlayers = game.numberOfPlayers;
          return game.numberOfPlayers;
        })
        .then(playerCount => {
          store.getState().users.users.length === playerCount
            ? store.dispatch(assignRoles()) && getPlayerProfile()
            : console.log(
                chalk.bold.cyan(
                  'User added. Waiting for more users to start game.'
                )
              );
        })
        .catch(err => console.error(err));
    });
    // LEADER CHOSE TEAM-------------------------------------------------------
    socket.on('deploy team', team => {
      roster = team;
      io.in(socket.game).emit('team chosen', team);
    });
    // CURE OR SABOTAGE CHOSEN-------------------------------------------------
    socket.on('chose cure or sabotage', choice => {
      const round = store.getState().round.round;
      choice === 'CURE'
        ? store.dispatch(voteCure())
        : store.dispatch(voteSabotage());
      // if pal3000 is active and on the mission
      if (pal3000 && !pal3000.voted && roster.includes('PAL3000')) {
        const palChoice = pal3000.cureOrSabotage();
        palChoice === 'CURE'
        ? store.dispatch(voteCure())
        : store.dispatch(voteSabotage());
        pal3000.voted = true;
      }
      const results = store.getState().cureOrSabotage.voteStatus;
      const totalVotes = store.getState().cureOrSabotage.deployedVoteCount;
      // log(chalk.bold.black(`
      //   ${results}, 'results ... 1 for sabotage ... 0 for cure', 
      //   ${totalVotes}, 'totalVotes', 
      //   ${store.getState()}, 'STORE after vote dispatch'`
      // ));
      totalVotes === grid[socket.numberOfPlayers][round - 1] && results === 1
        ? store.dispatch(infiltratorRoundWin())
        : console.log(chalk.magenta('not a great day to be a scientist'));
      totalVotes === grid[socket.numberOfPlayers][round - 1] && results === 0
        ? store.dispatch(scientistRoundWin())
        : console.log(chalk.magenta('great day to be a scientist'));
      totalVotes === grid[socket.numberOfPlayers][round - 1]
        ? io.in(socket.game).emit('mission result', results) &&
          setTimeout(function () {
            // reset PAL3000's voted status
            if (pal3000) {
              pal3000.voted = false;
            }
            let scientistWinTotal = store.getState().game.scientistWins;
            let infiltratorWinTotal = store.getState().game.infiltratorWins;
            let winner;
            if (scientistWinTotal === 3) {
              winner = false;
              // if PAL3000 played, update his stats
              if (pal3000) {
                pal3000.updateStats(winner);
                // reset PAL for next game
                pal3000 = undefined;
              }
              io.in(socket.game).emit('game over', winner);
              // DISCONNECT SOCKET--------------------------------------------
              setTimeout(() => socket.leave(socket.game), 3000);
              store.dispatch(resetUsers());
              store.dispatch(restartGame());
              store.dispatch(restartRounds());
              store.dispatch(resetVotes());
            } else if (infiltratorWinTotal === 3) {
              winner = true;
              // if PAL3000 played, update his stats
              if (pal3000) {
                pal3000.updateStats(winner);
                // reset PAL for next game
                pal3000 = undefined;
              }
              io.in(socket.game).emit('game over', winner);
              // DISCONNECT SOCKET--------------------------------------------
              setTimeout(() => socket.leave(socket.game), 3000);
              store.dispatch(resetUsers());
              store.dispatch(restartGame());
              store.dispatch(restartRounds());
              store.dispatch(resetVotes());
            } else {
              store.dispatch(incrementRound());
              store.dispatch(resetVotes());
              const round = store.getState().round.round;
              const rosterLength = grid[socket.numberOfPlayers][round - 1];
              const roundLeader =
                leaderStorage[socket.game].leaderLoop[
                  leaderStorage[socket.game].index
                ];
              io.in(socket.game).emit('start round', {
                leader: roundLeader.username,
                round,
                rosterLength,
              });
              leaderStorage[socket.game].index++;
              if (roundLeader.username === 'PAL3000') {
                pal3000.isLeader = true;
                setTimeout(() => {
                  // PAL3000 chooses roster
                  roster = pal3000.chooseMissionRoster(rosterLength);
                  io.in(socket.game).emit('team chosen', roster);
                }, 3000);
              }
            }
          }, 3000)
        : console.log(chalk.red('Waiting for more votes'));
    });

    // PLAYERS VOTE YES OR NO ON LEADER'S MISSION ROSTER SELECTION------------
    socket.on('chose YES or NO', ({ vote, username }) => {
      if (pal3000 && !pal3000.voted) {
        const palVote = pal3000.voteForMissionTeam(roster);
        // add PAL3000 vote to proposalResults
        proposalResults.push({ name: 'PAL3000', vote: palVote });
        palVote === 'YES' ? store.dispatch(voteYes()) : store.dispatch(voteNo());
        pal3000.voted = true;
        pal3000.isLeader = false;
      }
      // track each players vote
      proposalResults.push({ name: username, vote });
      // increment yes and no votes as individual votes come in
      vote === 'YES' ? store.dispatch(voteYes()) : store.dispatch(voteNo());
      // If everyone has voted
      if (
        store.getState().proposalVotes.totalMissionVotes ===
        socket.numberOfPlayers
      ) {
        // More accepts than rejects for team proposal
        const voteSucceeds =
          store.getState().proposalVotes.voteSuccess >
          store.getState().proposalVotes.voteFail;
        let results;
        voteSucceeds === false ? (results = 1) : (results = 0);
        const round = store.getState().round.round;
        const rosterLength = grid[socket.numberOfPlayers][round - 1];
        const roundLeader =
          leaderStorage[socket.game].leaderLoop[
            leaderStorage[socket.game].index
          ];
        // Send roster vote results back to client
        io.in(socket.game).emit('roster vote result', {
          voteSucceeds,
          vote: proposalResults,
        });
        // reset PAL3000's voted status
        if (pal3000) {
          pal3000.voted = false;
        }
        // If vote succeeds, reset fail count, mission votes,
        // move to cure or sabotage vote via on mission event
        if (voteSucceeds) {
          store.dispatch(resetMissionVotes());
          console.log(
            chalk.bgWhite.blue(
              store.getState().proposalVotes.totalMissionVotes,
              'totalMissionVotes after success'
            )
          );
          store.dispatch(resetFail());
          proposalResults = [];
          io.in(socket.game).emit('on mission');
        } else if (!voteSucceeds) {
          // If vote fails, check if this is third fail on current
          if (store.getState().game.failCount === 2) {
            // If this is the third failed vote on current round,
            // check if the infiltrators already have 2 wins
            io.in(socket.game).emit('mission result', results);
            // If this is the third round win for the infiltrators
            setTimeout(() => {
              const infiltratorWinTotal = store.getState().game.infiltratorWins;
              console.log(chalk.bgYellow.black(infiltratorWinTotal));
              let winner;
              if (infiltratorWinTotal === 2) {
                // Set winner to true for client and emit game over event with infiltrator win
                winner = true;
                // if PAL3000 played, update his stats
                if (pal3000) {
                  pal3000.updateStats(winner);
                  pal3000 = undefined;
                }
                io.in(socket.game).emit('game over', winner);
                setTimeout(() => socket.leave(socket.game), 3000);
                store.dispatch(resetUsers());
                store.dispatch(restartGame());
                store.dispatch(restartRounds());
                store.dispatch(resetVotes());
              } else {
                // If this is not the third win for the infiltrators,
                // reset appropriate state and start new new round
                store.dispatch(infiltratorRoundWin());
                store.dispatch(resetFail());
                store.dispatch(resetMissionVotes());
                store.dispatch(incrementRound());
                const round = store.getState().round.round;
                proposalResults = [];
                leaderStorage[socket.game].index++;
                setTimeout(
                  () =>
                    io.in(socket.game).emit('start round', {
                      leader: roundLeader.username,
                      round,
                      rosterLength,
                    }),
                  5000
                );
                if (roundLeader.username === 'PAL3000') {
                  pal3000.isLeader = true;
                  setTimeout(() => {
                    // PAL3000 chooses roster
                    roster = pal3000.chooseMissionRoster(rosterLength);
                    io.in(socket.game).emit('team chosen', roster);
                  }, 3000);
                }
              }
            }, 3000);
          } else {
            // If this is not the third failed vote, reset mission votes,
            // increment fail, assign new leader, wait for next proposal
            store.dispatch(incrementFail());
            store.dispatch(resetMissionVotes());
            proposalResults = [];
            leaderStorage[socket.game].index++;
            setTimeout(() => {
              io.in(socket.game).emit('start round', {
                leader: roundLeader.username,
                round,
                rosterLength,
              });
              if (roundLeader.username === 'PAL3000') {
                pal3000.isLeader = true;
                setTimeout(() => {
                  // PAL3000 chooses roster
                  roster = pal3000.chooseMissionRoster(rosterLength);
                  io.in(socket.game).emit('team chosen', roster);
                }, 3000);
              }
            }, 5000);
          }
        }
      } else {
        console.log(chalk.bgCyan.red('Waiting for votes '));
      }
    });
  });
};
