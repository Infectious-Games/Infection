const sockets = require('socket.io');


module.exports = (server) => {
    const io = sockets(server);
    const storeUsers = (game) => {
        const namespace = io.of('/');
        namespace.in(game).clients((error, clients) => {
            if (error) {
                throw error;
            } else {
                let players = clients.map(client => { 
                    return {
                        socketID: client, 
                        username: namespace.connected[client].username, 
                        game: namespace.connected[client].game 
                    } 
                });
                console.log(players.length, 'players');
                io.in(game).emit('game start', players);
            }
        });
    };
    io.on('connection', (socket) => {

      socket.on('join game', (playerProps) => {
        const game = playerProps.game;
        const username = playerProps.username;
        socket.game = game;
        socket.username = username;
        console.log(`${username} has joined ${game}`, playerProps);
    //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
        socket.join(game);
        //TODO: insert reducer function to handle storage of all players associated with game
        //STARTS GAME WITH ROLE ASSIGNMENTS---------------------------------------------------------------------------        
        let gameStartStatus = storeUsers(game);
        console.log(gameStartStatus);
        //socket.emit('game start', { player: 'Athena' });
        //io.in(game)
    });

    //NEW ROUND-------------------------------------------------------------------------------------------------
    //instead of a new round event, put the leader chosen emitter in a setTimeout here and below which implicitely starts new round
    socket.on('start round', () => {
        //TODO: get leader from store
        io.in(game).emit('leader chosen'); /* TODO: second arg will be leader's username */
    });
    //LEADER CHOSE TEAM----------------------------------------------------------------------------------------
    socket.on('deploy team', (team) => {
        io.in(game).emit('team chosen', team);
    })
    //CURE OR SABOTAGE CHOSEN-----------------------------------------------------------------------------------
    socket.on('chose cure or sabotage', (choice) => {
        //TODO: update state of game according to the choice submitted
        let results; /* TODO: assign results to the current mission results and game state */
        io.in(game).emit('results', results);
        //setTimeout on leader chosen emitter to start next round IF results are not final game results
    })
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
    })
};
