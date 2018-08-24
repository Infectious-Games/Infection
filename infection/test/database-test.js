const db = require('../backend/database');
var expect = require('chai').expect;

describe('User model:', function () {
  after(() => {
    db.User.find({ where: { username: 'Testy' } })
      .then((user) => user.destroy())
      .then(() => db.db.close())
  });

  describe('findOrCreateUser', function () {
    it(`should save users to the database if they don't already exist`, function (done) {
      const user = { username: 'Testy' };
      db.findOrCreateUser(user, (data) => {
        // data is true: if user has been added to the db, or
        // false: if user was already in the db
        expect(data).to.be.a('boolean');
        done();
      });
    });
  });
  describe('updateUserStats', function () {
    it(`should update a user's stats`, function (done) {
      const update = { username: 'Testy', win: true };
      db.updateUserStats(update, (data) => {
        // if updated correctly, should increment wins by 1
        expect(data).to.have.property('wins').to.equal(1);
        done();
      });
    });
  });
});
