const db = require('./database');

module.exports = (app) => {        
// find or add a user to the db
	app.post('/user', (req, res) => {
		const { body } = req;
		db.updateUser(body, (data) => {
		// response is true if user has been added to db, or false if user already exists
		res.json(data);
		});
	});
//get join code for new game
	app.post('/start', (req, res) => {
		//take player count from body and use it to create game instance
		const { body } = req;
		const playerCount = body.playerCount;
		//send join code (unique game id) back to client
		db.createGameAndGetJoinCode(playerCount, (joinCode) => {
		res.json(joinCode);
		});
	});
// update user's stats in the db
	app.post('/userStats', (req, res) => {
		const { body } = req;
		console.log(body, 'body in server');
		db.updateUserStats(body, (data) => {
		res.json(data);
		});
	});
}