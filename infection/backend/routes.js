const express = require('express');
const { join } = require('path');
const dotenv = require('dotenv');
const gameRooms = require('./gameRooms');

dotenv.load();

const db = require('./database');

module.exports = app => {
  // find user in the db
  app.get('/user', (req, res) => {
    const credentials = req.query;
    db.findUser(credentials, data => {
      res.json(data);
    });
  });

  // add a user to the db
  app.post('/user', (req, res) => {
    const { body } = req;
    db.createUser(body, user => {
      res.json(user);
    });
  });

  // Get join code for new game
  app.post('/start', (req, res) => {
    // Take player count from body and use it to create game instance
    const { body } = req;
    const { playerCount } = body;
    // check for empty games in store, return that game room;
    const joinCodes = Object.keys(gameRooms).filter(
      gameName => gameRooms[gameName].playerCount === 0
    );
    // join code becomes first empty game
    const joinCode = joinCodes[0];
    db.createGameAndGetJoinCode(body, gameId => {
      gameRooms[joinCode].playerCount = playerCount;
      gameRooms[joinCode].dbGameID = gameId;
    });
    res.json(joinCode);
  });

  // update user photo on db
  app.post('/updatePhoto', (req, res) => {
    const { body } = req;
    db.updatePhoto(body, user => {
      res.json(user);
    });
  });

  // Update user's stats in the db
  app.post('/userStats', (req, res) => {
    const { body } = req;
    db.updateUserStats(body, data => {
      res.json(data);
    });
  });

  // get user's stats from the db
  // app.get('/userStats', (req, res) => {
  //   const query = req.query;
  //   db.getUserStats(query, (data) => {
  //     res.json(data);
  //   });
  // });

  app.use(express.static(join(__dirname, '../build')));
};
