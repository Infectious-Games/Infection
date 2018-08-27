// ******** AI LOGIC ******** //
// ******** PAL 3000 ******** //

class PAL3000 {
  constructor(scientist, team) {
    this.scientist = scientist; // true or false
    this.team = team; // players in the game
    
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
  // Leader Choosing Mission Roster
  chooseMissionRoster(numberOfPlayers) {
    // choses self and (numberOfPlayers - 1) random players
    const numberOfPlayersToAdd = numberOfPlayers - 1;
    const shuffledTeam = this.team;
    let l = shuffledTeam.length; 
    // shuffle the team
    // While there remain players to shuffle
    while (l) {
      // pick a random player's index from those remaining
      let i = Math.floor(Math.random() * l--);
      // swap the current player with the randomly seleted player
      [shuffledTeam[l], shuffledTeam[i]] = [shuffledTeam[i], shuffledTeam[l]];
    }
    return ['PAL3000'].concat(shuffledTeam.slice(0, numberOfPlayersToAdd));
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

const pal3000 = new PAL3000(true, ['Athena', 'Mark', 'Matt', 'Paul']);
console.log(pal3000, 'pal3000');
console.log(pal3000.cureOrSabotage(), 'cureOrSabotage()');
console.log(pal3000.chooseMissionRoster(3), 'chooseMissionRoster()');
// console.log(voteForMissionTeam(true), 'voteForMissionTeam(true)');


