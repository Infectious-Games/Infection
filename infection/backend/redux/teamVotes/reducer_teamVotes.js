const { VOTE_YES, VOTE_NO, RESET_MISSION_VOTES } = require('./actions_teamVotes');
const initialState = require('./initialState_teamVotes');

const proposalVote = (state = initialState, action) => {
  // Handle dispatched actions
  switch (action.type) {
  /*
  * If a team-proposal vote is 'yes':
  *   - return current state of voteFail
  *   - increment current state of voteSuccess by 1
  *   - increment current state of totalMissionVotes by 1
  */ 
  case VOTE_YES:
    return Object.assign({}, state, {
      voteFail: state.voteFail,
      voteSuccess: state.voteSuccess + 1,
      totalMissionVotes: state.totalMissionVotes + 1
    });
  /*
  * If a team-proposal vote is 'no':
  *   - return current state of voteSuccess
  *   - increment current state of voteFail by 1
  *   - increment current state of totalMissionVotes by 1
  */   
  case VOTE_NO: 
    return Object.assign({}, state, {
      voteFail: state.voteFail + 1,
      voteSuccess: state.voteSuccess,
      totalMissionVotes: state.totalMissionVotes + 1
    });
  // Reset to initial values
  case RESET_MISSION_VOTES:
    return Object.assign({}, state, {
      voteFail: 0,
      voteSuccess: 0,
      totalMissionVotes: 0
    });
  // Return current state
  default: 
    return state;
  }
};

module.exports = proposalVote;