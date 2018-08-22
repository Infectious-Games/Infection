const db = require('../backend/database');
var expect = require('chai').expect;
// const Sequelize = require('sequelize');

describe('Database Testing:', function () {
  after(() => {
    db.User.find({ where: { username: 'Testy' } })
    .then((user) => user.destroy())
    .then(() => db.db.close())
  });

  describe('The database', function () {
    it('should save users to the database', function (done) {
      const user = {username: 'Testy'};
      db.updateUser(user, (data) => {
        // data is true: if user has been added to the db, or
        // false: if user was already in the db
        expect(data).to.be.a('boolean');
        done();
      });
    });
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
