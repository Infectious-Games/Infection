

let players = [
  'mark',
  'paul',
  'athena',
  'matthew',
  'alec',
  'josh',
  'senai',
  'joe',
  'connor',
  'sean'
];
let data = {};

let infiltrators = ~~(players.length * .44);
let scientists = players.length - infiltrators;
let party = randomizeRoles(scientists, infiltrators, players.slice());


let randomizeRoles = function(numK, numM, players) {
  //  and infiltrators should only ever have one player attached to it
  // scientists and infiltrators should be an array of those players, even if it is only one
  let party = {
    scientists: [],
    infiltrators: []
  };
  var side;

  // Iterate through total of players
  while (numK + numM > 0) {

    // Decide which team player goes to
    if (numK < 1) {
      // If there are no more knight spots
      // make them a minion
      side = 1;
    } else if (numM < 1) {
      // if there are no more minion spots
      // make them a knight
      side = 0;
    } else {
      // Randomly generate a number between 0 and 2 (0 or 1) if there are knight and minion spots open
      side = Math.floor(Math.random() * 2);
    }

    // If 0
    if (side === 0) {
      // Assign last player as a knight
      party.scientists.push(players.pop());
      // Decrement scientists
      numK--;
    } else if (side === 1) {
      // Assign last player as a minion
      party.infiltrators.push(players.pop());
      // Decrement infiltrators
      numM--;
    }
  }

  return party;
  
};



// for (var y = 0; y < infiltrators.length; y++) {
//   data[infiltrators[y]] = [players[y],'INFILTRATOR'];
// }

console.log(scientists, 'scientists');
console.log(infiltrators, 'infiltrators');
console.log(data, 'data');
console.log(players[2]);

var chooseParty = require('./chooseParty').chooseParty;

module.exports.assignRoles = function(memcache, socket) {
  console.log('assigning roles');
  // Note: memcache needs to store the current stage in the game.
  // TODO: 
  // memcache set current stage to 'roles'
  memcache.setTurnPhase('ROLES');

  // randomly determine each player's role.  Assign only one Merlin and one Assassin
  // scientists are good guys, infiltrators are bad guys
  // Get a list of players from the memcache
  memcache.getPids().then(function(pidsList) {
    //Prepare the data object that will be returned to the players
    var data = {};

    console.log('Inside assignRoles, pidsList from memcache: ', pidsList);

    var scientists = Math.floor(pidsList.length / 3 * 2);
    var infiltrators = pidsList.length - scientists;

    // Therefore, scientists and infiltrators should look like this
    //  5 = 3k + 2m
    //  6 = 4k + 2m
    //  7 = 4k + 3m
    //  8 = 5k + 3m
    //  9 = 6k + 3m
    // 10 = 6k + 4m
    // Assign the players to scientists or infiltrators
    var party = randomizeRoles(scientists, infiltrators, pidsList.slice());
    // Make a random member of each side Merlin or the Assassin respectively
    party.merlin = party.scientists[Math.floor(Math.random() * party.scientists.length)];
    party.assassin = party.infiltrators[Math.floor(Math.random() * party.scientists.length)];

    // Update memcache with the correct party layout
    for (var x = 0; x < party.scientists.length; x++) {
      data[party.scientists[x]] = 'KNIGHT';
      memcache.setRole(party.scientists[x], 'KNIGHT');
    } 
    for (var y = 0; y < party.infiltrators.length; y++) {
      data[party.infiltrators[y]] = 'MINION';
      memcache.setRole(party.infiltrators[y], 'MINION');
    }
    if (party.merlin) {
      data[party.merlin] = 'MERLIN';
      memcache.setMerlin(party.merlin);
    }
    if (party.assassin) {
      data[party.assassin] = 'ASSASSIN';
      memcache.setAssassin(party.assassin);
    }

    // Assign party leader at random and save to memcache: 
    memcache.setLeader(pidsList[Math.floor(Math.random() * pidsList.length)]);

    console.log('data for assignroles', data);
    

  });
};

// Takes in number of scientists, infiltrators, and an array of the player names/id
// Returns an object with the group broken down into Merlin, scientists, Assassin, and infiltrators
const randomRoles = function(numK, numM, players) {
  // Merlin and Assassin should only ever have one player attached to it
  // scientists and infiltrators should be an array of those players, even if it is only one
  let party = {
    scientists: [],
    securityOfficer: null,
    infiltrators: []
  };

  var side;

  // Iterate through total of players
  while (numK + numM > 0) {

    // Deceide which team player goes to
    if (numK < 1) {
      // If there are no more knight spots
      // make them a minion
      side = 1;
    } else if (numM < 1) {
      // if there are no more minion spots
      // make them a knight
      side = 0;
    } else {
      // Randomly generate a number between 0 and 2 (0 or 1) if there are knight and minion spots open
      side = Math.floor(Math.random() * 2);
    }

    // If 0
    if (side === 0) {
      // Assign last player as a knight
      party.scientists.push(players.pop());
      // Decrement scientists
      numK--;
    } else if (side === 1) {
      // Assign last player as a minion
      party.infiltrators.push(players.pop());
      // Decrement infiltrators
      numM--;
    }
  }

  return party;
};