const { createStore } = require('redux');

//TODO: THESE WILL NOT LIVE HERE IN PRODUCTION - - - - >
const { ADD_NEW_USER } = require('./users/actions_users'); 
const { sayGoodbye, sayHello } = require('./test/actionCreator_test');
const { newUser } = require('./users/actionCreator_users');
const { incrementRound, restartRounds } = require('./rounds/actionCreator_rounds');
const { voteCure, voteSabotage } = require('./cureOrSabotage/actionCreator_cureOrSabotage');
const { VOTE_CURE, VOTE_SABOTAGE } = require('./cureOrSabotage/actions_cureOrSabotage.js');

const reducer = require('./root_reducer');

let store = createStore(reducer);

module.exports = store;


//TODO: THESE WILL NOT LIVE HERE IN PRODUCTION - - - - >

// console.log(store);
// store.dispatch(sayGoodbye());
// store.dispatch(sayHello());
// store.dispatch(incrementRound()); // goes to 1
// store.dispatch(incrementRound()); // goes to 2
// store.dispatch(incrementRound()); // goes to 3
// store.dispatch(restartRounds()); // goes to 0
// store.dispatch(incrementRound()); // goes to 1
// store.dispatch(incrementRound()); // goes to 2

// console.log(module.exports.getState().test);
// store.dispatch({type: ADD_NEW_USER, username:'matthew', room:'demo', socketID:23434, infiltrator: false, securityOfficer:false})
// store.dispatch({type: ADD_NEW_USER, username:'athena', room:'demo', socketID:23435, infiltrator: false, securityOfficer:false})
// store.dispatch({type: ADD_NEW_USER, username:'mark', room:'demo', socketID:23437, infiltrator: false, securityOfficer:false})
// store.dispatch({type: ADD_NEW_USER, username:'paul', room:'demo', socketID:23438, infiltrator: false, securityOfficer:false})
// console.log(store.getState().users)
// store.dispatch(newUser('Mark','demo',345,false,false))
// store.dispatch(newUser('Matt','demo',346,false,false))
// store.dispatch(newUser('Athena','demo',347,false,true))
// store.dispatch(newUser('Paul','demo',348,false,false))
// store.dispatch(voteCure());
// store.dispatch(voteCure());
// store.dispatch(voteSabotage());
// store.dispatch(voteCure());
console.log(store.getState());
// console.log((store.getState().users.length === 4) ? store.getState().users : 'waiting for users')