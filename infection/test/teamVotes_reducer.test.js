const { expect } = require('chai');
const { voteYes, voteNo, resetMissionVotes } = require('../backend/redux/teamVotes/actionCreator_teamVotes');
const { initialState } = require('../backend/redux/teamVotes/initialState_teamVotes');

const reducer = require('../backend/redux/teamVotes/reducer_teamVotes');


describe('teamVotes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal({
      voteStatus: 0,
      totalMissionVotes: 0
    });
  });
  it('should handle VOTE_YES', () => {
    expect(reducer({ voteStatus: 0, totalMissionVotes: 0 }, voteYes())).to.deep.equal({
      voteStatus: 0,
      totalMissionVotes: 1
    });
  });
  it('should handle VOTE_NO', () => {
    expect(reducer({ voteStatus: 0, totalMissionVotes: 1 }, voteNo())).to.deep.equal({
      voteStatus: 1,
      totalMissionVotes: 2
    });
  });
  it('should handle VOTE_YES after VOTE_NO and not alter voteStatus', () => {
    expect(reducer({ voteStatus: 1, totalMissionVotes: 2 }, voteYes())).to.deep.equal({
      voteStatus: 1,
      totalMissionVotes: 3
    });
  });
  it('should handle RESET_VOTES', () => {
    expect(reducer({ voteStatus: 1, totalMissionVotes: 3 }, resetMissionVotes())).to.deep.equal({
      voteStatus: 0,
      totalMissionVotes: 0
    });
  });
});
