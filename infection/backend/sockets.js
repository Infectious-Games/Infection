const sockets = require('socket.io');
const store = require('./redux/store');
const { newUser, assignRoles } = require('./redux/users/actionCreator_users');
const { ADD_NEW_USER, ASSIGN_ROLES } = require('./redux/users/actions_users');
const { incrementRound, restartRounds } = require('./redux/rounds/actionCreator_rounds');
const { voteCure, voteSabotage } = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');
const { leaderLoopCreator } = require('./assignLeaderHelper');

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
        //TODO: update state of game according to the choice submitted
        let results = store.getState().voteStatus; /* TODO: assign results to the current mission results and game state */
        io.in(socket.game).emit('mission result', results);
        //setTimeout on start round emitter to start next round IF results are not final game results
        setTimeout(function () {
            const winner = true; // true: scientist, false: infiltrators
            if (winner) { /*TODO: winner: scientists or infiltrators */
                io.in(socket.game).emit('game over', winner);
            } else {
                socket.emit('start round', { leader: 'Bob', round: 1 }); /* TODO: ASSIGN NEW LEADER AND ROUND */
                console.log('new round started in server');
            }
        }, 3000);
    })
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
  });
};
