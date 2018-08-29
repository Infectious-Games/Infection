// NO LONGER USING THIS TO ASSIGN LEADERS


// const shuffle = (array) => {
//   let n = array.length;
//   let i;
//   let shuffled = [];
//   while (n) {
//     i = Math.floor(Math.random() * array.length);
//     if (i in array) {
//       shuffled.push(array[i]);
//       delete array[i];
//       n--;
//     }
//   }
//   return shuffled;
// }

// const leaderLoopCreator = (users) => {
//   let shuffled = shuffle(users);
//   let usersToConcat = Array(3).fill(shuffled, 0);
//   return usersToConcat.concat.apply([], usersToConcat);
// };

// module.exports = {
//   leaderLoopCreator
// }