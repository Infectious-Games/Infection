const { ADD_NEW_USER, ASSIGN_ROLES, RESET_USERS } = require('./actions_users');

const newUser = (username, room, socketID, infiltrator, securityOfficer) => ({
  type: ADD_NEW_USER,
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer,
});

const assignRoles = (
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer
) => ({
  type: ASSIGN_ROLES,
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer,
});

const resetUsers = (
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer
) => ({
  type: RESET_USERS,
  username,
  room,
  socketID,
  infiltrator,
  securityOfficer,
});

module.exports = {
  newUser,
  assignRoles,
  resetUsers,
};
