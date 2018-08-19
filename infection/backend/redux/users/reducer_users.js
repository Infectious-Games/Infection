const { ADD_NEW_USER, ASSIGN_ROLES } = require('./actions_users.js');
  
const initialState = require('./initialState_users.js');


const users = (state = initialState, action) => {
  // Action Type Passed 
  switch (action.type) {
  // When New Users Join the Room  
  case ADD_NEW_USER: 
    return state.concat([{
      username: action.username, 
      room: action.room,
      socketID: action.socketID,
      infiltrator: false,
      securityOfficer: false,
    }]);
  
  case ASSIGN_ROLES:
    // TODO: When we go to 5 players, see below + change assignment
    // let infiltratorCount = ~~(state.length * .44);
    let ind = ~~(Math.random() * state.length);
    state[ind].infiltrator = true;
      
  default:
    return state;
  }
};

module.exports = users;
