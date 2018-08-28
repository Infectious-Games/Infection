const express = require('express');
const { join } = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('cookie-session');
const { SESSION_OPTIONS } = require('../config');
const dotenv = require('dotenv');
dotenv.load();
const db = require('./database');

const log = console.log;

module.exports = (app) => {
  // find or add a user to the db
  app.post('/user', (req, res) => {
    const { body } = req;
    db.findOrCreateUser(body, (data) => {
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
    log(body, 'body in server');
    db.updateUserStats(body, (data) => {
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
  
  //////////////////////////////////////////////////////
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
  passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    db.findOrCreateUser(profile, (user) => {
      log(`user is ${user}`);
      return done(null, user);
    });
  }));

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    }));

  app.get('/auth/google/redirect',
    passport.authenticate('google', {
      // TODO: Handle routes back to client properly
      failureRedirect: '/',
      successRedirect: '/'
    }));

  // check if user is loggedIn
  app.get('/loggedIn', (req, res) => {
    res.json({ 
      loggedIn: !!req.user, 
      user: req.user 
    });
  })

  // logout user
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use(express.static(join(__dirname, '../build')));
};
