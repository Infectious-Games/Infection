const sockets = require('socket.io');

module.exports = (server) => {
    const infection = sockets(server);
    //socket.on('eventName', callback)
        //e.g. (data) => console.log(data);
    infection.on('connection', (socket) => {
      //io.on returns a socket, call methods on that socket below
      console.log('connected to Infection');
      //figure out all events that need to be handled in game
      //if event type === 'whatever'
      socket.on('join game', (playerProps) => {
        const game = playerProps.gameName;
        const username = playerProps.username;
        console.log(`${username} has joined ${game}`, playerProps);
        socket.join(game);
        //TODO: insert reducer function to handle storage of all players associated with game
        //TODO: Once 
        socket.to(game).emit('Welcome everyone to demo game. Sockets are working');
        /* second optional arg in .emit is any data that needs to be passed to client */
        socket.on('some event that I am listening to', callback);
    
        socket.on('disconnect', () => {})
        });
    })
};
