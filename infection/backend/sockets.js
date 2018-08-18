const sockets = require('socket.io');
const store = require('./redux/store');
const { newUser, assignRoles } = require('./redux/users/actionCreator_users');
const { ADD_NEW_USER, ASSIGN_ROLES } = require('./redux/users/actions_users')
const { incrementRound, restartRounds } = require('./redux/rounds/actionCreator_rounds');
const { voteCure, voteSabotage } = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');

module.exports = (server) => {
    const io = sockets(server);
    
    io.on('connection', (socket) => {
        socket.on('join game', (playerProps) => {
            const game = playerProps.game;
            const username = playerProps.username;
            socket.game = game;
            socket.username = username;

            store.dispatch({ type: ADD_NEW_USER, username, room: game, socketID:socket.id })

            const getPlayerProfile = () => {
                let team = store.getState().users.map(user => user.username);
                store.getState().users.forEach(user => {
                    let data = user;
                    data.team = team
                    io.to(user.socketID).emit('game start', data);
                });
            }
        // SET LEADER--------------------------------------------------------------------------------------------
                // setTimeout(() => { 
                //     socket.emit('start round', { leader: 'Bob', round: 1 });
                // }, 30000);
            //}           
            store.getState().users.length === 4 
            ? store.dispatch(incrementRound()) && store.dispatch(assignRoles()) && getPlayerProfile()
            : console.log('waiting for more users');
        //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
            socket.join(game);
    })

    //NEW ROUND-------------------------------------------------------------------------------------------------
    //instead of a new round event, put the leader chosen emitter in a setTimeout here and below which implicitely starts new round
    // START ROUND WITH LEADER CHOSEN
        //TODO: get leader from store
    // socket.emit('start round', 'Paul');
    //LEADER CHOSE TEAM----------------------------------------------------------------------------------------
    socket.on('deploy team', (team) => {
        console.log(team, 'team');
        io.in(socket.game).emit('team chosen', team);   
    })
    //CURE OR SABOTAGE CHOSEN-----------------------------------------------------------------------------------
    socket.on('chose cure or sabotage', (choice) => {
        //TODO: update state of game according to the choice submitted
        let results = store.getState().voteStatus; /* TODO: assign results to the current mission results and game state */
        io.in(game).emit('mission result', results);
        //setTimeout on start round emitter to start next round IF results are not final game results
        setTimeout(function () {
            if (winner) { /*TODO: (who won) gameRusult: scientists or infiltrators */
                io.in(game).emit('game over', winner);
            } else {
                socket.emit('start round', { leader: 'Bob', round: 1 }); /* TODO: ASSIGN LEADER AND ROUND */
            }
        }, 3000);
    })
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
    })
};
