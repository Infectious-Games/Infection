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
      return 'CURE'
      // if infiltrator
    } else {
      return 'SABOTAGE'
    }
  }
  // Leader Choosing Team
  chooseTeam() {
    setTimeout(() => {
      // choses self and x random players
      
    }, 5000); 
  }  
  // Voting for mission team
  voteForMissionTeam(includesInfiltrator) { // true or false
    // if scientist
    if (this.scientist) {
      // 50/50 Yes/No
    // if infiltrator
    } else {
      // if mission includes an infiltrator
      if (includesInfiltrator) {
        return 'YES';
      // if mission does NOT include an infiltrator
      } else {
        return 'NO';
      }
    }
  }
};

module.exports = {
  PAL3000
};

