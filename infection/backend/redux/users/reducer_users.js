const { ADD_NEW_USER, ASSIGN_ROLES, RESET_USERS } = require('./actions_users.js');
const initialState = require('./initialState_users.js');

const users = (state = initialState, action) => {
  switch (action.type) {
    // When new user joins the room, create a new array of users with the new user
    /* eslint-disable */
    case ADD_NEW_USER:
      return Object.assign({}, state, {
        users: state.users.concat({
          username: action.username,
          room: action.room,
          socketID: action.socketID,
          infiltrator: false,
          securityOfficer: false,
        },
      )
    });  
    case ASSIGN_ROLES:
      // Determine appropriate number of infiltrators
      const infiltratorCount = ~~(state.users.length * .44);
    
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
      const shuffled = arrayShuffled(state.users);
      
      // Assign infiltrator to appropriate number of infiltrators
      const updated = shuffled.map((user, index) => {
        (index < infiltratorCount)
          ? user.infiltrator = true
          : user.infiltrator = false;
        }
      );
    
      return Object.assign({}, state, { updated });
    case RESET_USERS: 
      return Object.assign({}, state, {
        users: []
      } )  
    // By default, return current state
    default:
      return state;
  }
};

module.exports = users;
