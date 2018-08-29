const { ADD_NEW_USER, ASSIGN_ROLES } = require('./actions_users.js');
const initialState = require('./initialState_users.js');

const users = (state = initialState, action) => {
  switch (action.type) {
    // When new user joins the room, create a new array of users with the new user
    /* eslint-disable */
    case ADD_NEW_USER:
      return state.concat([
        {
          username: action.username,
          room: action.room,
          socketID: action.socketID,
          infiltrator: false,
          securityOfficer: false,
        },
      ]);  
    case ASSIGN_ROLES:
      // Determine appropriate number of infiltrators
      let infiltratorCount = ~~(state.length * .44);
      // Shuffle users for assignment
      let arrayShuffled = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = ~~(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };
      let shuffled = arrayShuffled(state);
      // Assign infiltrator to appropriate number of infiltrators
      let assigned = shuffled.map((user, index) => {
        if (index < infiltratorCount) {
          user.infiltrator = true;
          return user;
        } else {
          user.infiltrator = false;
          return user;
        }
      });
      // break;
    // By default, return current state
    default:
      return state;
  }
};

module.exports = users;
