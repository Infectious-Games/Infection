const { expect } = require('chai');
const { incrementRound, restartRounds } = require('../backend/redux/rounds/actionCreator_rounds');
const reducer = require('../backend/redux/rounds/reducer_rounds');
const { initialState } = require('../backend/redux/rounds/initialState_rounds');

describe('rounds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal({
      round: 0
    });
  });
  it('should handle INCREMENT_ROUND', () => {
    expect(reducer({ round: 1 }, incrementRound())).to.deep.equal({
      round: 2
    });
  });
  it('should handle RESTART_ROUNDS', () => {
    expect(reducer({ round: 3 }, restartRounds())).to.deep.equal({
      round: 0
    });
  });
});