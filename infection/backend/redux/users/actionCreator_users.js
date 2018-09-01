const { ADD_NEW_USER, ASSIGN_ROLES, RESET_USERS } = require('./actions_users');

const newUser = (gameID, username, socketID, infiltrator, securityOfficer) => ({
  type: ADD_NEW_USER,
  gameID,
  username,
  socketID,
  infiltrator,
  securityOfficer,
});

const assignRoles = (gameID, infiltrator) => ({
  type: ASSIGN_ROLES,
  gameID,
  infiltrator,
});

const resetUsers = gameID => ({
  type: RESET_USERS,
  gameID,
});

module.exports = {
  newUser,
  assignRoles,
  resetUsers,
};
