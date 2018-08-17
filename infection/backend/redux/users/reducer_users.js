const { UPDATE_USERS, SET_USERNAME, ADD_NEW_USER } = require('./actions_users.js')
  
const initialState = require('./initialState_users.js');


const users = (state = initialState, action) => {
let newState = Object.assign({}, state);

// Action Type Passed 
switch (action.type) {
  // When New Users Join the Room  
  case UPDATE_USERS:
  return state;
    // if (action.player.id) {
    //   //TODO: Connect to specific user on db/socket
    //   let currentPlayer = xxxxxx;
    //   if (!currentPlayer) {
    //     //TODO: See above
    //     xxxxx = {
    //       leader: false,
    //       username: '',
    //       infiltrator: false
    //     }
    //   } 
    // }
    // return newState;
  case ADD_NEW_USER: 
    //TODO: get socketID to track unique
    return state.concat([{
      username: action.username, 
      room: action.room,
      socketID: action.socketID,
      role: null,
      securityOfficer: false,
    }]);
  
  case SET_USERNAME:
    //TODO:
    return newState;
  // Return current state if incorrect action passed
  default:
    return state;
  }
}

module.exports = users;
