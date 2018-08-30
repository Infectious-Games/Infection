const express = require('express');
const { join } = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('cookie-session');
const dotenv = require('dotenv');
const { SESSION_OPTIONS } = require('../config');

dotenv.load();
const db = require('./database');

const log = console.log;

module.exports = app => {
  // find or add a user to the db
  app.post('/user', (req, res) => {
    const { body } = req;
    db.findOrCreateUser(body, data => {
      // Response is true if user has been added to db
      // False if user already exists
      res.json(data);
    });
  });
  // Get join code for new game
  app.post('/start', (req, res) => {
    // Take player count from body and use it to create game instance
    const { body } = req;
    console.log(body, 'body routes.js 28');
    // const { playerCount } = body;
    // Send join code (unique game id) back to client
    db.createGameAndGetJoinCode(body, joinCode => {
      res.json(joinCode);
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
        db.findOrCreateUser(profile, user => {
          log(`user is ${user}`);
          return done(null, user);
        });
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
