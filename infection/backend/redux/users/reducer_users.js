const { UPDATE_USERS, SET_USERNAME, ADD_NEW_USER, ASSIGN_ROLES } = require('./actions_users.js')
  
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
      infiltrator: false,
      securityOfficer: false,
    }]);
  
  case SET_USERNAME:
    //TODO: Probably will not be using this now.
    return newState;
  
  case ASSIGN_ROLES:
    // TODO: When we go to 5 players, see below + change assignment
    // let infiltratorCount = ~~(state.length * .44);
    let ind = ~~(Math.random() * state.length);
    state[ind].infiltrator = true;
      
  default:
    return state;
  }
}

module.exports = users;

// let users2 = Array(3).fill(users, 0);
// let merged = users2.concat.apply([], users2);