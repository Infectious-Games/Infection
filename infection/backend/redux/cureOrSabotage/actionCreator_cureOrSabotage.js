const { VOTE_CURE, VOTE_SABOTAGE } = require('./actions_cureOrSabotage');

const voteCure = (voteStatus, deployedVoteCount) => ({
  type: VOTE_CURE,
  voteStatus,
  deployedVoteCount
});

const voteSabotage = (voteStatus, deployedVoteCount) => ({
  type: VOTE_SABOTAGE,
  voteStatus,
  deployedVoteCount
});

module.exports = {
  voteCure,
  voteSabotage
};