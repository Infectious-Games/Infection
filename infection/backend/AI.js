// ******** AI LOGIC ******** //
// ******** PAL 3000 ******** //

class PAL3000 {
  constructor(scientist) {
    this.scientist = scientist; // true or false
    
  }
  // CURE vs. SABOTAGE choice
  cureOrSabotage() {
    // if scientist
    if (this.scientist) {
      // votes CURE
      return 'CURE'
      // if infiltrator
    } else {
      // votes SABOTAGE
      return 'SABOTAGE'
    }
  }
  // Leader Choosing Team
  chooseTeam() {
    // choses self and x random players

  }  
  // Voting for mission team
  voteForMissionTeam() {
    // if scientist
    if (this.scientist) {
      // 50/50 Yes/No
    // if infiltrator
    } else {
      // votes YES for missions which include an infiltrator
      // votes NO for missions which do NOT include an infiltrator
    }
  }

};

module.exports = {
  PAL3000
};

