const { UPDATE_USER, ADD_NEW_USER, SET_USERNAME } = require('./actions_users');

const updateUser = (id, room, username) => ({
  
  type: UPDATE_USER,
  // User input from the client 
  username,
  // From the socket 
  room, 
  // Socket ID 
  id, 
});

const newUser = (username, game, role, leader, securityOfficer) => {
  return {
    type: ADD_NEW_USER,
    username,
    game,
    role = null,
    leader = false,
    securityOfficer = false
  }  
}

const setUsername = (id, room, username) => ( {
  type: SET_USERNAME,
  id,
  username,
  room
})

module.exports = {
  updateUser, 
  setUsername, 
  newUser
}

