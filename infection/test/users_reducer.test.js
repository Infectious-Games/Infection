const { expect } = require('chai');
const { newUser } = require('../backend/redux/users/actionCreator_users');
const reducer = require('../backend/redux/users/reducer_users');
const { initialState } = require('../backend/redux/users/initialState_users');

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal([]);
  });
  it('should handle ADD_NEW_USER', () => {
    expect(reducer(initialState, newUser('Mr. Rogers', 'Neighborhood', 90210, false, false))).to.deep.equal([{
      username: 'Mr. Rogers', 
      room: 'Neighborhood',
      socketID: 90210,
      infiltrator: false,
      securityOfficer: false
    }]
    );
  });
  it('should handle adding multiple users', () => {
    expect(reducer([{username: 'Mr. Rogers', room: 'Neighborhood', socketID: 90210, infiltrator: false, securityOfficer: false}], newUser('Count Dracula', 'A Street Called Sesame', 39654, false, false)))
      .to.deep.equal([{
        username: 'Mr. Rogers',
        room: 'Neighborhood',
        socketID: 90210,
        infiltrator: false,
        securityOfficer: false
      }, {
        username: 'Count Dracula',
        room: 'A Street Called Sesame',
        socketID: 39654,
        infiltrator: false,
        securityOfficer: false
      }]
      );
  });
});