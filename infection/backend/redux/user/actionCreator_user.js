const newUser = (username, game, role, leader, securityOfficer) => {
  return {
    username,
    game,
    role = null,
    leader = false,
    securityOfficer = false
  }  
}
