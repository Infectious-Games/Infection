const { VOTE_SABOTAGE, VOTE_CURE, RESET_VOTES } = require('./actions_cureOrSabotage');
const initialState = require('./initialState_cureOrSabotage');

const submitVote = (state = initialState, action) => {
  switch (action.type) {
  /*
  * If a mission vote is 'cure':
  *   - return current state of voteStatus
  *   - increment current state of deployedVoteCount by 1
  */   
  case VOTE_CURE:
    return Object.assign({}, state, {
      voteStatus: state.voteStatus,
      deployedVoteCount: state.deployedVoteCount + 1
    });
  /*
  * If a mission vote is 'sabotage':
  *   - change voteStatus to 1
  *   - increment current state of deployedVoteCount by 1
  */     
  case VOTE_SABOTAGE: 
    return Object.assign({}, state, {
      voteStatus: 1,
      deployedVoteCount: state.deployedVoteCount + 1
    });
  // Reset to initial values  
  case RESET_VOTES:
    return Object.assign({}, state, {
      voteStatus: 0,
      deployedVoteCount: 0
    });
  // Return current state  
  default: 
    return state;
  }
};

module.exports = submitVote;