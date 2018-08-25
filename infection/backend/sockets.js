const sockets = require('socket.io');
const store = require('./redux/store');
const { assignRoles, newUser } = require('./redux/users/actionCreator_users');
const { voteYes, voteNo, resetMissionVotes } = require('./redux/teamVotes/actionCreator_teamVotes');
const { incrementRound, restartRounds } = require('./redux/rounds/actionCreator_rounds');
const { voteCure, voteSabotage, resetVotes } = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');
const { leaderLoopCreator } = require('./assignLeaderHelper');
const { scientistRoundWin, infiltratorRoundWin, restartGame, incrementFail, resetFail } = require('./redux/game/actionCreator_game');
const { Game } = require('./database');
const grid = require('./redux/logic_constants');
const chalk = require('chalk');
const log = console.log;

module.exports = (server) => {
  const io = sockets(server);
  let leaderLoop;
  let leaderLoopIndex = 0;
  let proposalResults = [];

  io.on('connection', (socket) => {

    socket.on('join game', (playerProps) => {
      const game = playerProps.game;
      const username = playerProps.username; 
      socket.game = game;
      socket.username = username;

      store.dispatch(newUser(username, game, socket.id));

      //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
      socket.join(game);

      const getPlayerProfile = () => {
        const playersInGame = store.getState().users;
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
          user.team = team;
          io.to(user.socketID).emit('game start', user);
        });
        setTimeout(() => {
          store.dispatch(incrementRound());
          let round = store.getState().round.round;
          let rosterLength = grid[socket.numberOfPlayers][round - 1];
          leaderLoop = leaderLoopCreator(store.getState().users);
          let roundLeader = leaderLoop[leaderLoopIndex];
          leaderLoopIndex++;
          io.in(game).emit('start round', 
            {leader: roundLeader.username, round, rosterLength} 
          );
        }, 5000);  
      };
      Game.find({ where: { id: game } })
        .then((game) => {
          console.log(game.numberOfPlayers, 'line 59');
          socket.numberOfPlayers = game.numberOfPlayers;
          return game.numberOfPlayers;
        })
        .then(playerCount => {
          console.log(playerCount, '63');
          store.getState().users.length === playerCount
            ? store.dispatch(assignRoles()) && getPlayerProfile()
            : log(chalk.bold.cyan('User added. Waiting for more users to start game.'));
        })
        .catch(err => console.error(err));         
    });
    const users = store.getState().users;
    //LEADER CHOSE TEAM----------------------------------------------------------------------------------------
    socket.on('deploy team', (team) => {
      console.log(team, 'team chosen by leader made it to server');
      io.in(socket.game).emit('team chosen', team);   
    });
    //CURE OR SABOTAGE CHOSEN-----------------------------------------------------------------------------------
    socket.on('chose cure or sabotage', (choice) => {
      choice === 'CURE'
        ? store.dispatch(voteCure())
        : store.dispatch(voteSabotage());
      
      let results = store.getState().cureOrSabotage.voteStatus;
      let totalVotes = store.getState().cureOrSabotage.deployedVoteCount;
      
      log(chalk.bold.black(`
        ${results}, 'results ... 1 for sabotage ... 0 for cure', 
        ${totalVotes}, 'totalVotes', 
        ${store.getState()}, 'STORE after vote dispatch'`
      ));
      
      (totalVotes === 3 && results === 1)
        ? store.dispatch(infiltratorRoundWin())
        : log(chalk.magenta('not a great day to be a scientist'));
        
      (totalVotes === 3 && results === 0)
        ? store.dispatch(scientistRoundWin())
        : log(chalk.magenta('great day to be a scientist'));  

      totalVotes === 3
        ? io.in(socket.game).emit('mission result', results) &&

          setTimeout(function () {
            let scientistWinTotal = store.getState().game.scientistWins;  
            let infiltratorWinTotal = store.getState().game.infiltratorWins;  
            let winner;

            if (scientistWinTotal === 3) {
              winner = false;
              io.in(socket.game).emit('game over', winner);
              //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
              socket.disconnect(true);
            } else if (infiltratorWinTotal === 3) {
              winner = true;
              io.in(socket.game).emit('game over', winner);
              //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
              socket.disconnect(true);
            } else { 
              store.dispatch(incrementRound());
              store.dispatch(resetVotes());
              let round = store.getState().round.round;
              let rosterLength = grid[socket.numberOfPlayers][round - 1];
              let roundLeader = leaderLoop[leaderLoopIndex];
              leaderLoopIndex++;
              io.in(socket.game).emit('start round', {leader: roundLeader.username, round, rosterLength});     
            }
          }, 3000)

        : log(chalk.red('Waiting for more votes'));
    });

    //PLAYERS VOTE YES OR NO ON LEADER'S MISSION ROSTER SELECTION---------------------------------------------------------
    socket.on('chose YES or NO', ({ vote, username }) => {
      console.log(vote, 'vote in sockets.js');
      // track each players vote
      // return object with (each players vote, similar to...
      proposalResults.push({name: username, vote});
      //increment yes and no votes as individual votes come in
      vote === 'YES' ? store.dispatch(voteYes()) : store.dispatch(voteNo());

      // If everyone has voted  
      if (store.getState().proposalVotes.totalMissionVotes === socket.numberOfPlayers) {
        // More accepts than rejects for team proposal
        const voteSucceeds = store.getState().proposalVotes.voteFail < store.getState().proposalVotes.voteSuccess;
        let round = store.getState().round.round;
        let rosterLength = grid[socket.numberOfPlayers][round - 1];
        let roundLeader = leaderLoop[leaderLoopIndex];
        leaderLoopIndex++;

        // Send roster vote results back to client
        io.in(socket.game).emit('roster vote result', { voteSucceeds, vote: proposalResults });
        
        // If vote succeeds, reset fail count, mission votes, move to cure or sabotage vote via on mission event
        if (voteSucceeds) {
          store.dispatch(resetMissionVotes());
          store.dispatch(resetFail());
          setTimeout(() => io.in(socket.game).emit('on mission'), 5000);
        } else if (!voteSucceeds) {
          // If vote fails, check if this is third fail on current 
          if (store.getState().game.failCount === 2) {
            // If this is the third failed vote on current round, check if the infiltrators already have 2 wins
            setTimeout(() => io.in(socket.game).emit('mission result', voteSucceeds));
            // If this is the third round win for the infiltrators
            if (store.getState().game.infiltratorWins() === 2) {
              // Set winner to true for client and emit game over event
              setTimeout(() => {
                let winner = true;
                io.in(socket.game).emit('game over', winner);
              }, 5000);
            } else {
              // If this is not the third win for the infiltrators, 
              // reset appropriate state and start new new round
              store.dispatch(infiltratorRoundWin());
              store.dispatch(resetFail());
              store.dispatch(resetMissionVotes());
              store.dispatch(incrementRound());
              setTimeout(() => io.in(socket.game).emit('start round', 
                { leader: roundLeader.username, round, rosterLength }), 5000);              
            } 
          } else {
            // If this is not the third failed vote, reset mission votes, 
            // increment fail assign new leader, wait for next proposal
            io.in(socket.game).emit('mission result', voteSucceeds);
            store.dispatch(incrementFail());
            store.dispatch(resetMissionVotes());
            setTimeout(() => io.in(socket.game).emit('start round', 
              { leader: roundLeader.username, round, rosterLength }), 5000);
          }
        }    
      } else {
        log(chalk.bgCyan.red('Waiting for votes '));
      }      
    });
  });
};
