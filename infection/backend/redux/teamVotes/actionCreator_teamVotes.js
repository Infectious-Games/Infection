const {
  VOTE_YES,
  VOTE_NO,
  RESET_MISSION_VOTES,
} = require('./actions_teamVotes');

const voteYes = (gameID, voteFail, voteSuccess, totalMissionVotes) => ({
  type: VOTE_YES,
  gameID,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

const voteNo = (gameID, voteFail, voteSuccess, totalMissionVotes) => ({
  type: VOTE_NO,
  gameID,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

const resetMissionVotes = (gameID, voteFail, voteSuccess, totalMissionVotes) => ({
  type: RESET_MISSION_VOTES,
  gameID,
  voteFail,
  voteSuccess,
  totalMissionVotes,
});

module.exports = {
  voteYes,
  voteNo,
  resetMissionVotes,
};
