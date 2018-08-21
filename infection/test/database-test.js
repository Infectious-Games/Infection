const db = require('../backend/database');
var expect = require('chai').expect;

describe('User', function () {
  after(() => db.db.close());

  describe('database', function () {
    it('should save users to the database', function (done) {
      const user = {username: 'Testy'};
      db.updateUser(user, (data) => {
        // data is true: if user has been added to the db, or
        // false: if user was already in the db
        expect(data).to.be.a('boolean');
        done();
      })
    });
  });
});
