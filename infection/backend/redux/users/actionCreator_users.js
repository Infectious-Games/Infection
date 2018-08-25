const { ADD_NEW_USER, ASSIGN_ROLES, RESET_USERS } = require('./actions_users');

const newUser = (username, room, socketID, infiltrator, securityOfficer) => ({
  type: ADD_NEW_USER,
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer
});

const assignRoles = (infiltrator) => ({
  type: ASSIGN_ROLES,
  infiltrator
});

const resetUsers = () => ({
  type: RESET_USERS
});

module.exports = {
  newUser,
  assignRoles,
  resetUsers
};



