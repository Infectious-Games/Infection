const { expect } = require('expect');
const { newUser } = require('../users/actionCreator_users');
const reducer = require('../users/reducer_users');
const { initialState } = require('../users/initialState_users');

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      users: []
    });
  });
  it('should handle ADD_NEW_USER', () => {
    expect(reducer(initialState, newUser('Mr. Rogers', 'Neighborhood', 90210, false, false))).toEqual({ 
      users: [{
        username: 'Mr. Rogers', 
        room: 'Neighborhood',
        socketID: 90210,
        infiltrator: false,
        securityOfficer: false,
      }]
    });
  });
  it('should handle adding multiple users', () => {
    expect(reducer({ 
      users: [{
        username: 'Mr. Rogers', 
        room: 'Neighborhood',
        socketID: 90210,
        infiltrator: false,
        securityOfficer: false,
      }]
    }, newUser('Count Dracula', 'A Street Called Sesame', 39654, true, false))).toEqual({ 
      users: [{
        username: 'Mr. Rogers', 
        room: 'Neighborhood',
        socketID: 90210,
        infiltrator: false,
        securityOfficer: false,
      }, {
        username: 'Count Dracula',
        room: 'A Street Called Sesame',
        socketID: 39654,
        infiltrator: true,
        securityOfficer: false
      }]
    });
  });
});