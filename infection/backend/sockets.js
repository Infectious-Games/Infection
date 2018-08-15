const sockets = require('socket.io');

module.exports = (server) => {
    const io = sockets(server);
    //socket.on('eventName', callback)
        //e.g. (data) => console.log(data);
    io.on('connection', (socket) => {
      //io.on returns a socket, call methods on that socket below

      socket.on('join game', (playerProps) => {
        const game = playerProps.gameName;
        const username = playerProps.username;
        console.log(`${username} has joined ${game}`, playerProps);

    //SERVER CONNECTS PLAYER TO GAME---------------------------------------------------------------------------
        socket.join(game);
        //TODO: insert reducer function to handle storage of all players associated with game
        //TODO: insert conditional  that checks if this is the last user needed to start the game, if so call emitter below
        //STARTS GAME WITH ROLE ASSIGNMENTS---------------------------------------------------------------------------
        io.in(game).emit('start game'); /* TODO: second arg will be players in store for this game, with role assignments */
    });

    //NEW ROUND-------------------------------------------------------------------------------------------------
    socket.on('start round', () => {
        //TODO: get leader from store
        io.in(game).emit('leader chosen'); /* TODO: second arg will be leader's username */
    });
    //LEADER CHOSE TEAM----------------------------------------------------------------------------------------
    socket.on('deploy team', (team) => {
        io.in(game).emit('team chosen'); /* TODO: second arg will be all team members deployed */ 
    })
    //CURE OR SABOTAGE CHOSEN-----------------------------------------------------------------------------------
    socket.on('chose cure or sabotage', (choice) => {
        //TODO: update state of game according to the choice submitted
        let results; /* TODO: assign results to the current mission results and game state */
        io.in(game).emit('results', results);
    })
    //DISCONNECT SOCKET-----------------------------------------------------------------------------------------
    // socket.on('disconnect', () => {})
    })
};
