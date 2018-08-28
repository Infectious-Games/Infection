// ******** AI LOGIC ******** //
// ******** PAL 3000 ******** //

class PAL3000 {
  constructor(scientist, team, infiltrators) {
    this.scientist = scientist; // true or false
    this.team = team; // players in the game
    this.infiltrators = infiltrators // array of infiltrators
  }
  // CURE vs. SABOTAGE choice
  cureOrSabotage() {
    // if scientist choose 'CURE'
    // else infiltrator choose 'SABOTAGE'
    return this.scientist ? 'CURE' : 'SABOTAGE';
  }
  // Leader Choosing Mission Roster
  chooseMissionRoster(numberOfPlayers) {
    // choses self and (numberOfPlayers - 1) random players
    // shuffle the team
    const shuffledTeam = this.team;
    let l = shuffledTeam.length; 
    // While there remain players to shuffle
    while (l) {
      // pick a random player's index from those remaining
      let i = Math.floor(Math.random() * l--);
      // swap the current player with the randomly seleted player
      [shuffledTeam[l], shuffledTeam[i]] = [shuffledTeam[i], shuffledTeam[l]];
    }
    return ['PAL3000'].concat(shuffledTeam.slice(0, numberOfPlayers - 1));
  }  
  // Voting for mission team
  voteForMissionTeam(proposedRoster) { // array of proposed roster
    // checks if proposedRoster includes an Infiltrator
    const includesInfiltrator = proposedRoster.some(player => {
      return this.infiltrators.includes(player);
    }); 
    // if scientist
    if (this.scientist) {
      // 50/50 Yes/No vote
      const random = Math.random();
      return random > .5 ? 'YES' : 'NO';
    // if infiltrator
    } else {
      // if mission includes an infiltrator vote 'YES' 
      // otherwise vote 'NO'
      return includesInfiltrator ? 'YES' : 'NO';
    }
  }
};

module.exports = {
  PAL3000
};

// const pal3000 = new PAL3000(false, ['Athena', 'Mark', 'Matt', 'Paul'], ['Paul', 'PAL3000']);
// console.log(pal3000, 'pal3000');
// console.log(pal3000.cureOrSabotage(), 'cureOrSabotage');
// console.log(pal3000.chooseMissionRoster(3), 'chooseMissionRoster');
// console.log(pal3000.voteForMissionTeam(['Athena', 'Mark', 'Paul']), 'voteForMissionTeam');


