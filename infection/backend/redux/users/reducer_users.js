const {
  ADD_NEW_USER,
  ASSIGN_ROLES,
  RESET_USERS,
} = require('./actions_users.js');
const initialState = require('./initialState_users.js');

const users = (state = initialState, action) => {
  const newState = Object.assign({}, state); // object containing all game objects, each with an array of users
  switch (action.type) {
    // When new user joins the room, create a new array of users with the new user
    /* eslint-disable */
    case ADD_NEW_USER:
      newState[action.gameID].users.push({
        gameID: action.gameID,
        username: action.username,
        socketID: action.socketID,
        infiltrator: false,
        securityOfficer: false,
      });
      return newState;
    case ASSIGN_ROLES:
      // Determine appropriate number of infiltrators
      const infiltratorCount = ~~(state[action.gameID].users.length * .44);
      // Shuffle users for assignment
      const arrayShuffled = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = ~~(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };
      const shuffled = arrayShuffled(state[action.gameID].users);
      // Assign infiltrator to appropriate number of infiltrators
      const updated = shuffled.map((user, index) => {
        if (index < infiltratorCount) {
          user.infiltrator = true;
        } else {
          user.infiltrator = false;
        } return user;
      }
      );
      newState[action.gameID].users = updated;
      return newState;
      
    case RESET_USERS: 
      newState[action.gameID].users = [];
      return newState;
    // By default, return current state
    default:
      return newState;
  }
};

module.exports = users;

