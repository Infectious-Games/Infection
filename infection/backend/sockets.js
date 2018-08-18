const sockets = require('socket.io');
const store = require('./redux/store');
const { newUser } = require('./redux/users/actionCreator_users');
const { ADD_NEW_USER } = require('./redux/users/actions_users')
const { incrementRound, restartRounds } = require('./redux/rounds/actionCreator_rounds');
const { voteCure, voteSabotage } = require('./redux/cureOrSabotage/actionCreator_cureOrSabotage');

module.exports = (server) => {
    const io = sockets(server);
    const storeUsers = (game) => {
        const namespace = io.of('/');
        namespace.in(game).clients((error, clients) => {
            if (error) {
                throw error;
            } else {
                let players = clients.map((client, index) => { 
        //TODO: Add a function for more elegant role assignment
                    let evil;
                    if (index === 0) {
                        evil = true;
                    } else {
                        evil = false;
                    }
                    return {
                        socketID: client, 
                        username: namespace.connected[client].username, 
                        game: namespace.connected[client].game,
                        infiltrator: evil 
                    } 
                });
                console.log(players.length, 'players');
                return players.length === 4
                ? io.in(game).emit('game start', players)
                : io.in(game).emit('game start', {gameStatus: 'waiting on players to join'});
            }
        });
    };
    io.on('connection', (socket) => {
        socket.on('join game', (playerProps) => {
        const game = playerProps.game;
        const username = playerProps.username;
        socket.game = game;
        socket.username = username;
        store.dispatch({ type: ADD_NEW_USER, username, room: game, socketID:socket.id })
        store.getState().users.length === 4 ? 
        store.dispatch(incrementRound()) : 
        console.log('waiting for more users')
        console.log(store.getState().users[0]);

        console.log(`${username} has joined ${game}`, playerProps);
    //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
        socket.join(game);
        //TODO: insert reducer function to handle storage of all players associated with game
        //STARTS GAME WITH ROLE ASSIGNMENTS---------------------------------------------------------------------------        
        let gameStartStatus = storeUsers(game);
        // SET TIMEOUT 30 SEC
        // setTimeout(function () { 
        //     // SET LEADER AND ROUND for start of round
        //     socket.emit('start round', { leader: 'Bob', round: 1 });
        // }, 3000);
    });

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
        io.in(game).emit('results', results);
        //setTimeout on leader chosen emitter to start next round IF results are not final game results
    })
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
    })
};
