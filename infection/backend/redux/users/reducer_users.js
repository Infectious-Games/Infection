const { ADD_NEW_USER, ASSIGN_ROLES, RESET_USERS } = require('./actions_users.js');
  
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
    let infiltratorCount = ~~(state.length * .44);
    let scientistCount = state.length - infiltratorCount;
    let arrayShuffled = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };
    let shuffled = arrayShuffled(state);
    let assigned = shuffled.map((user, index) => {
      if (index < infiltratorCount) {
        user.infiltrator = true;
        return user;
      } else {
        user.infiltrator = false;
        return user;
      }
    });

  case RESET_USERS: 
    return initialState;
    
  default:
    return state;
  }
};

module.exports = users;
