const sockets = require('socket.io');
const store = require('./redux/store');
const { newUser, assignRoles } = require('./redux/users/actionCreator_users');
const { ADD_NEW_USER, ASSIGN_ROLES } = require('./redux/users/actions_users');
const { incrementRound, restartRounds } = require('./redux/rounds/actionCreator_rounds');
const { voteCure, voteSabotage, resetVotes } = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');
const { leaderLoopCreator } = require('./assignLeaderHelper');
const { scientistRoundWin, infiltratorRoundWin, restartGame } = require('./redux/game/actionCreator_game');

module.exports = (server) => {
  const io = sockets(server);
    
  io.on('connection', (socket) => {
    socket.on('join game', (playerProps) => {
      const game = playerProps.game;
      const username = playerProps.username;
      socket.game = game;
      socket.username = username;

      store.dispatch({ type: ADD_NEW_USER, username, room: game, socketID: socket.id });

      const getPlayerProfile = () => {
        let team = store.getState().users.map(user => user.username);
        store.getState().users.forEach(user => {
          let data = user;
          data.team = team;
          io.to(user.socketID).emit('game start', data);
        });
        setTimeout(() => {
          store.dispatch(incrementRound());
          let round = store.getState().round.round;
          let leaderLoop = leaderLoopCreator(store.getState().users);
          let roundLeader = leaderLoop[round - 1];
          io.in(game).emit('start round', 
            {leader: roundLeader.username, round} 
          );
        }, 3000);  
      };         
      store.getState().users.length === 4 
        ? store.dispatch(assignRoles()) && getPlayerProfile()
        : console.log('waiting for more users');
      //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
      socket.join(game);
    });
    //LEADER CHOSE TEAM----------------------------------------------------------------------------------------
    socket.on('deploy team', (team) => {
      console.log(team, 'team');
      io.in(socket.game).emit('team chosen', team);   
    });
    //CURE OR SABOTAGE CHOSEN-----------------------------------------------------------------------------------
    socket.on('chose cure or sabotage', (choice) => {
      console.log(choice, 'choice collected in server');
      choice === 'CURE'
        ? store.dispatch(voteCure())
        : store.dispatch(voteSabotage());
      
      let results = store.getState().voteStatus;
      let totalVotes = store.getState().cureOrSabotage.deployedVoteCount;
      
      console.log(results);
      console.log(totalVotes);
      console.log(store.getState(), 'STORE after vote dispatch');
        
      totalVotes === 3
        ? io.in(socket.game).emit('mission result', results) &&
          setTimeout(function () {
            let scientistWinTotal = store.getState().game.scientistWins;  
            let infiltratorWinTotal = store.getState().game.infiltratorWins;  
            let winner;
            if (scientistWinTotal === 2) {
              winner = true;
              io.in(socket.game).emit('game over', winner);
            } else if (infiltratorWinTotal === 2) {
              winner = false;
              io.in(socket.game).emit('game over', winner);
            } else {
              store.dispatch(incrementRound());
              store.dispatch(resetVotes());
              let roundLeader = leaderLoop[round - 1];
              io.in(game).emit('start round', {leader: roundLeader.username, round}); 
            }
          }, 5000)

        : console.log('Waiting for more votes');

    });
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
  });
};
