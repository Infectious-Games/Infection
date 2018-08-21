const { expect } = require('expect');
const { voteYes, voteNo, resetMissionVotes } = require('../teamVotes/actionCreator_teamVotes');
const { initialState } = require('../teamVotes/initialState_teamVotes');

const reducer = require('../teamVotes/reducer_teamVotes');


describe('teamVotes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      voteStatus: 0,
      totalMissionVotes: 0
    });
  });
  it('should handle VOTE_YES', () => {
    expect(reducer({ voteStatus: 0, totalMissionVotes: 0 }, voteYes())).toEqual({
      voteStatus: 0,
      totalMissionVotes: 1
    });
  });
  it('should handle VOTE_NO', () => {
    expect(reducer({ voteStatus: 0, totalMissionVotes: 1 }, voteNo())).toEqual({
      voteStatus: 1,
      totalMissionVotes: 2
    });
  });
  it('should handle VOTE_YES after VOTE_NO and not alter voteStatus', () => {
    expect(reducer({ voteStatus: 1, totalMissionVotes: 2 }, voteYes())).toEqual({
      voteStatus: 1,
      totalMissionVotes: 3
    });
  });
  it('should handle RESET_VOTES', () => {
    expect(reducer({ voteStatus: 1, totalMissionVotes: 3 }, resetMissionVotes())).toEqual({
      voteStatus: 0,
      totalMissionVotes: 0
    });
  });
});
