const express = require('express');
const { join } = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('cookie-session');
const dotenv = require('dotenv');
const { SESSION_OPTIONS } = require('../config');
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
    console.log(playerCount, 'playercount in routes 34');
    // check for empty games in store, return that game room;
    const joinCodes = Object.keys(gameRooms).filter(
      gameName => gameRooms[gameName].playerCount === 0
    );
    // join code becomes first empty game
    const joinCode = joinCodes[0];
    console.log(joinCode, 'joinCode in routes 41');
    console.log(body, 'body in routes 42');
    // ERROR: game.id in db 119 is not a number anymore
    // due to mongo db instead of SQL db ???
    db.createGameAndGetJoinCode(body, gameId => {
      gameRooms[joinCode].playerCount = playerCount;
      gameRooms[joinCode].dbGameID = gameId;
    });
    // db.createGameAndGetJoinCode(body, gameId => gameId)
    //   // .then(gameId => gameId)
    //   .then(gameId => {
    //     gameRooms[joinCode].playerCount = playerCount;
    //     gameRooms[joinCode].dbGameID = gameId;
    //   });
    console.log(joinCode, 'joinCode in routes 51');
    res.json(joinCode);
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

  // Passport
  app.use(session(SESSION_OPTIONS));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db.User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  // Passport Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        db.findOrCreateUser(profile, user => done(null, user));
      }
    )
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
    })
  );

  app.get(
    '/auth/google/redirect',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/',
    })
  );

  // Check if user is loggedIn
  app.get('/loggedIn', (req, res) => {
    res.json({
      loggedIn: !!req.user,
      user: req.user,
    });
  });

  // Logout user
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use(express.static(join(__dirname, '../build')));
};
