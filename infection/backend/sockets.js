const sockets = require('socket.io');
// const { joinGame, 
//         receiveRoleCard, 
//         chooseTeam, 
//         voteTeam, 
//         cureOrSabotage, 
//         sabotageMission,
//         getMissionResults } = require('./gameEvents');

module.exports = (server) => {
    const game = sockets(server);
    // Add the WebSocket handlers
    //socket.on('eventName', callback)
        //e.g. (data) => console.log(data);
    game.on('connection', (socket) => {
      //io.on returns a socket, call methods on that socket below
      console.log('connected to Infection');
      //figure out all events that need to be handled in game
      //if event type === 'whatever'
        socket.on('some event', (/**/) => {
          //e.g. socket.on('say to someone', (id, msg) => {
            // send a private message to the socket with the given id
            //socket.to(id).emit('my message', msg);
        });
        socket.on('disconnect', () => {})
    });
}