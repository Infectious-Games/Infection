const { expect } = require('expect');
const { incrementRound, restartRounds } = require('../rounds/actionCreator_rounds');
const reducer = require('../rounds/reducer_rounds');
const { initialState } = require('../rounds/initialState_rounds');

describe('rounds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      round: 0
    });
  });
  it('should handle INCREMENT_ROUND', () => {
    expect(reducer(incrementRound())).toEqual({
      round: 1
    });
  });
  it('should handle RESTART_ROUNDS', () => {
    expect(reducer(restartRounds())).toEqual({
      round: 0
    });
  });
});