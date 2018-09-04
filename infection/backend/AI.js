// ******** AI LOGIC ******** //
// ******** PAL 3000 ******** //

const db = require('./database');

class PAL3000 {
  constructor(scientist, team, infiltrators) {
    this.scientist = scientist; // true or false
    this.team = team.filter(player => player !== 'PAL3000'); // players in the game, other than PAL
    this.playerRecords = this.team.reduce((records, player) => {
      records[player] = {
        name: player,
        missionSuccessRate: 0,
        numberOfMissions: 0,
        numberOfSuccesses: 0,
      };
      return records;
    }, {});
    this.infiltrators = infiltrators; // array of infiltrators
    this.voted = false; // toggle to keep track of whether PAL has already voted
    this.isLeader = false; // toggle status of PAL as leader
  }

  // update player records
  updatePlayerRecords(result, roster) {
    // result: 0 = success, 1 = fail; roster = []; array of names
    let success;
    if (result === 0) {
      success = true;
    }
    // update each player's record as a % of missions with a success
    // filter out PAL: he's not concerned with his own record, because he knows he's a scientist ;)
    roster.filter(player => player !== 'PAL3000').forEach(player => {
      // increment the number of missions the player has participated in
      this.playerRecords[player].numberOfMissions += 1;
      if (success) {
        // increment the number of successful missions the player has participated in
        this.playerRecords[player].numberOfSuccesses += 1;
      }
      // calculate success rate
      this.playerRecords[player].missionSuccessRate =
        this.playerRecords[player].numberOfSuccesses /
        this.playerRecords[player].numberOfMissions;
    });
  }

  // CURE vs. SABOTAGE choice
  cureOrSabotage(round, roster) {
    // if infiltrator, choose 'CURE' sometimes to be deceptive
    if (!this.scientist) {
      // if round 1 or small roster size: 90% CURE
      if (round === 1 || (this.team.length + 1) / roster.length > 3) {
        // 90% 'CURE' vote
        const random = Math.random();
        return random < 0.9 ? 'CURE' : 'SABOTAGE';
      } // if numberOfPlayers/rosterSize > 2 = 50% CURE
      if ((this.team.length + 1) / roster.length > 2) {
        // 50% 'CURE' vote
        const random = Math.random();
        return random < 0.5 ? 'CURE' : 'SABOTAGE';
      }
      // otherwise
      return 'SABOTAGE';
    }
    // if scientist, always choose 'CURE'
    return 'CURE';
  }

  // Leader Choosing Mission Roster
  chooseMissionRoster(numberOfPlayers) {
    // choose players with the best mission success rate
    const teamSortedBySuccessRate = Object.values(this.playerRecords)
      .map(player => {
        // if a player hasn't been on a mission, set default success rate to 50%
        const playerDefault = player;
        if (!playerDefault.numberOfMissions) {
          playerDefault.missionSuccessRate = 0.5;
        }
        return playerDefault;
      })
      // sort team by highest success rate
      .sort((a, b) => b.missionSuccessRate - a.missionSuccessRate);
    // choose self and (numberOfPlayer - 1)
    return ['PAL3000'].concat(
      teamSortedBySuccessRate
        .map(player => player.name)
        .slice(0, numberOfPlayers - 1)
    );
    // Old method, might reimplement:
    // if infiltrator
    // choses self and (numberOfPlayers - 1) random players
    // shuffle the team
    // const shuffledTeam = this.team;
    // let l = shuffledTeam.length;
    // // While there remain players to shuffle
    // while (l) {
    //   // pick a random player's index from those remaining
    //   const i = Math.floor(Math.random() * (l -= 1));
    //   // swap the current player with the randomly seleted player
    //   [shuffledTeam[l], shuffledTeam[i]] = [shuffledTeam[i], shuffledTeam[l]];
    // }
    // return ['PAL3000'].concat(shuffledTeam.slice(0, numberOfPlayers - 1));
  }

  // Voting for mission team
  voteForMissionTeam(proposedRoster, failedRosterVotes) {
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
      // if 2 failed roster votes already
      if (failedRosterVotes === 2) {
        // vote 'YES' to avoid mission fail
        return 'YES';
      }
      // check to see if each member of proposedRoster has > 49% mission success record
      const approveProposedRoster = proposedRoster
        // filter out PAL: he's not concerned with his own record
        .filter(player => player !== 'PAL3000')
        // create an array of the proposedRoster's success rates
        .map(player => this.playerRecords[player].missionSuccessRate)
        // if every rate is greater than 49%
        .every(rate => rate > 0.49);
      return approveProposedRoster ? 'YES' : 'NO';
    }
    // if infiltrator
    // if mission includes an infiltrator vote 'YES'
    // otherwise vote 'NO'
    return includesInfiltrator ? 'YES' : 'NO';
  }

  updateStats(winner) {
    // winner === false: scientists won, winner === true: infiltrators won
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

// const pal3000 = new PAL3000(true, ['Athena', 'Mark', 'Matt', 'Paul', 'PAL3000'], ['Paul', 'Mark']);
// console.log(pal3000, 'pal3000');
// console.log(pal3000.updatePlayerRecords(0, ['Athena', 'Matt', 'PAL3000']), 'updatePlayerRecords');
// console.log(pal3000.updatePlayerRecords(1, ['Athena', 'Matt']), 'updatePlayerRecords');
// console.log(pal3000.updatePlayerRecords(1, ['Athena', 'Matt']), 'updatePlayerRecords');
// console.log(pal3000.chooseMissionRoster(3), 'chooseMissionRoster');
// console.log(pal3000.cureOrSabotage(2, ['Paul', 'PAL3000']), 'cureOrSabotage');
// console.log(pal3000.voteForMissionTeam(['Athena', 'Matt', 'PAL3000']), 'voteForMissionTeam');
