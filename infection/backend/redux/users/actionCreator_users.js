const { ADD_NEW_USER, ASSIGN_ROLES } = require('./actions_users');


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

module.exports = {
  newUser,
  assignRoles
};

