const { UPDATE_USERS, } = require('./actions_users.js')
  
const initialState = require('./initialState_users.js');


const users = (state = initialState, action) => {
let newState = Object.assign({}, state);

// Action Type Passed 
switch (action.type) {
  // When New Users Join the Room  
  case UPDATE_USERS:
    if (action.player.id) {
      //TODO: Connect to specific user on db/socket
      let currentPlayer = xxxxxx;
      if (!currentPlayer) {
        //TODO: See above
        xxxxx = {
          leader: false,
          username: '',
          infiltrator: false
        }
      } 
    }
    return newState;
  
  case SET_USERNAME:
    if (newState[action.roomId][action.id]) {
      newState[action.roomId][action.id].username = action.username;
    }
    return newState;
  // Return current state if incorrect action passed
  default:
    return state;
}
}

module.exports = users;
