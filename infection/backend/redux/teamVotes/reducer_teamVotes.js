const { VOTE_YES, VOTE_NO, RESET_MISSION_VOTES } = require('./actions_teamVotes');
const initialState = require('./initialState_teamVotes');

const proposalVote = (state = initialState, action) => {
  switch (action.type) {
  case VOTE_YES:
    return Object.assign({}, state, {
      voteFail: state.voteFail,
      voteSuccess: state.voteSuccess + 1,
      totalMissionVotes: state.totalMissionVotes + 1
    });
  case VOTE_NO: 
    return Object.assign({}, state, {
      voteFail: state.voteFail + 1,
      voteSuccess: state.voteSuccess,
      totalMissionVotes: state.totalMissionVotes + 1
    });
  case RESET_MISSION_VOTES:
    return Object.assign({}, state, {
      voteFail: 0,
      voteSuccess: 0,
      totalMissionVotes: 0
    });
  default: 
    return state;
  }
};

module.exports = proposalVote;