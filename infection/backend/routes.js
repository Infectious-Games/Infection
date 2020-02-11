const express = require('express');
const { join } = require('path');

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const session = require('cookie-session');
const dotenv = require('dotenv');

// const { SESSION_OPTIONS } = require('../config');
// const store = require('./redux/store');
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

  // const SESSION_OPTIONS = {
  //   secret: process.env.SESSION_SECRET || process.env.SECRET,
  //   cookie: {
  //     maxAge: 172800000,
  //     secure: true,
  //   },
  // };

  // Passport
  // app.use(session(process.env.SESSION_OPTIONS));
  // app.use(session(SESSION_OPTIONS));
  // app.use(passport.initialize());
  // app.use(passport.session());

  // passport.serializeUser((user, done) => done(null, user.id));

  // passport.deserializeUser((id, done) => {
  //   db.User.findById(id)
  //     .then(user => done(null, user))
  //     .catch(err => done(err));
  // });

  // Passport Google Strategy
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       callbackURL: '/auth/google/redirect',
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       db.findOrCreateUser(profile, user => done(null, user));
  //     }
  //   )
  // );

  // app.get(
  //   '/auth/google',
  //   passport.authenticate('google', {
  //     scope: ['profile'],
  //   })
  // );

  // app.get(
  //   '/auth/google/redirect',
  //   passport.authenticate('google', {
  //     failureRedirect: '/',
  //     successRedirect: '/',
  //   })
  // );

  // Check if user is loggedIn
  // app.get('/loggedIn', (req, res) => {
  //   res.json({
  //     loggedIn: !!req.user,
  //     user: req.user,
  //   });
  // });

  // Logout user
  // app.get('/logout', (req, res) => {
  // req.logout();
  //   res.redirect('/');
  // });

  app.use(express.static(join(__dirname, '../build')));
};
