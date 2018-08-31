// ******** AI LOGIC ******** //
// ******** PAL 3000 ******** //

const db = require('./database');

class PAL3000 {
  constructor(scientist, team, infiltrators) {
    this.scientist = scientist; // true or false
    this.team = team.filter(player => player !== 'PAL3000'); // players in the game, other than PAL
    this.teamRecords = this.team.reduce((teamObj, player) => {
      teamObj[player] = 0;
      return teamObj;
    }, {});
    // teamRecords = {
    //  {
    //  player: playerName,
    //  missionCure%: %,
    //  numberOfVotes: number,
    //  },
    //  {
    //  player: playerName,
    //  missionCure%: %,
    //  numberOfVotes: number,
    //  },
    // }
    this.infiltrators = infiltrators; // array of infiltrators
    this.voted = false; // toggle to keep track of whether PAL has already voted
    this.isLeader = false; // toggle status of PAL as leader
    this.firstMission
  }

  // update teamRecords
  updateTeamRecords() {
    // update each player's record as a % of missions with a success


  }

  // CURE vs. SABOTAGE choice
  cureOrSabotage(round, roster) {
    console.log(round, 'round AI.js 41');
    console.log(roster, 'roster AI.js 42');
    // IMPROVEMENTS:
    // if infiltrator, choose 'CURE' sometimes to be deceptive
    if (!this.scientist) {
      // if round 1 or small roster size: 90% CURE
      console.log(this.team.length, 'this.team.length AI.js 47');
      console.log((this.team.length + 1) / roster.length, 'this.team.length + 1 / roster.length AI.js 48');
      console.log((this.team.length + 1) / roster.length > 3, 'this.team.length + 1 / roster.length > 3 AI.js 49');
      if (round === 1 || (this.team.length + 1) / roster.length > 3) {
        // 90% 'CURE' vote
        const random = Math.random();
        console.log(random, 'random AI.js 51');
        return random < 0.9 ? 'CURE' : 'SABOTAGE';
      } // if numberOfPlayers/rosterSize > 2 = 50% CURE
      if ((this.team.length + 1) / roster.length > 2) {
        console.log('HIT 50%');
        // 50% 'CURE' vote
        const random = Math.random();
        return random < 0.5 ? 'CURE' : 'SABOTAGE';
      }
    } else {
      // if scientist choose 'CURE'
      return 'CURE';
    }
  }

  // Leader Choosing Mission Roster
  chooseMissionRoster(numberOfPlayers) {
    // IMPROVEMENTS:
    // if scientist
      // choose players with the best cure %
      // sort team by highest cure %
        // choose self and (numberOfPlayer - 1)

    // if infiltrator
    // choses self and (numberOfPlayers - 1) random players
    // shuffle the team
    const shuffledTeam = this.team;
    let l = shuffledTeam.length;
    // While there remain players to shuffle
    while (l) {
      // pick a random player's index from those remaining
      const i = Math.floor(Math.random() * l--);
      // swap the current player with the randomly seleted player
      [shuffledTeam[l], shuffledTeam[i]] = [shuffledTeam[i], shuffledTeam[l]];
    }
    return ['PAL3000'].concat(shuffledTeam.slice(0, numberOfPlayers - 1));
  }

  // Voting for mission team
  voteForMissionTeam(proposedRoster) {
    // IMPROVEMENTS:
    // if scientist
      // if each member of proposedRoster has > 50% mission success record
        // return 'YES'
      // otherwise
        // return 'NO'


    // checks if proposedRoster includes an Infiltrator
    const includesInfiltrator = proposedRoster.some(player =>
      this.infiltrators.includes(player)
    );
    // if PAL is leader
    if (this.isLeader) {
      return 'YES';
    }
    // if scientist
    if (this.scientist) {
      // 50/50 Yes/No vote
      const random = Math.random();
      return random > 0.5 ? 'YES' : 'NO';
      // if infiltrator
    } else {
      // if mission includes an infiltrator vote 'YES' 
      // otherwise vote 'NO'
      return includesInfiltrator ? 'YES' : 'NO';
    }
  }

  updateStats(winner) {
    // false = scientist won, true = infiltrators won
    if ((this.scientist && !winner) || (!this.scientist && winner)) {
      const update = { username: 'PAL3000', win: true };
      db.updateUserStats(update, () => console.log('PAL3000 stats updated'));
      // otherwise PAL3000 has lost the game
    } else {
      const update = { username: 'PAL3000', win: false };
      db.updateUserStats(update, () => console.log('PAL3000 stats updated'));
    }
  }
}

module.exports = {
  PAL3000,
};

// const pal3000 = new PAL3000(false, ['Athena', 'Mark', 'Matt', 'Paul', 'PAL3000', 'Bob'], ['Paul', 'Mark']);
// console.log(pal3000, 'pal3000');
// console.log(pal3000.cureOrSabotage(2, ['Paul', 'PAL3000']), 'cureOrSabotage');
// console.log(pal3000.chooseMissionRoster(3), 'chooseMissionRoster');
// console.log(pal3000.voteForMissionTeam(['Athena', 'Mark', 'Paul'], false), 'voteForMissionTeam');
