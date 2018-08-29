const {
  VOTE_YES,
  VOTE_NO,
  RESET_MISSION_VOTES,
} = require('./actions_teamVotes');

const voteYes = (voteFail, voteSuccess, totalMissionVotes) => ({
  type: VOTE_YES,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

const voteNo = (voteFail, voteSuccess, totalMissionVotes) => ({
  type: VOTE_NO,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

const resetMissionVotes = (voteFail, voteSuccess, totalMissionVotes) => ({
  type: RESET_MISSION_VOTES,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

module.exports = {
  voteYes,
  voteNo,
  resetMissionVotes,
};
