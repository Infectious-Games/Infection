const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('cookie-session');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config');
const { SESSION_OPTIONS } = require('../config');
const db = require('./database');

const log = console.log;

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
    log(body, 'body in server');
    db.updateUserStats(body, (data) => {
      res.json(data);
    });
  });
  // Passport Google Strategy
  passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // log(`+ ACCESS TOKEN ++++ ${accessToken} ++++ ACCESS TOKEN +`);
    log(profile.displayName, 'profile');
    db.updateUser({ username: profile.displayName }, (user) => {
      log(`user is ${user}`);
      return done(user);
    });
  }));
	
  passport.serializeUser((user, done) => 
    done(null, user.id));
	
  passport.deserializeUser((id, done) => {
    console.log(id, 'id in deserialize');
    db.User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
	
  app.get('/auth/google',
    passport.authenticate('google', { 
      scope: ['profile'] 
    }));
	
  app.get('/auth/google/redirect', 
    passport.authenticate('google', { 
      // TODO: Handle routes back to client properly
      failureRedirect: '/failure'
    }), (req, res) => res.redirect('/success'));

  app.use(session(SESSION_OPTIONS));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/failure', (req, res) => res.json({authenticated: false}));
  app.get('/success', (req, res) => res.json({authenticated: true}));


		
  // app.get('/success', (req, res) => {
  //   log('success - sending back to dashboard')
  //   res.send('success');
  //   // TODO: 
  // });
	
  // app.get('/failure', (req, res) => {
  //   log('failure - sending back to root');
  //   res.send('failure');
  // });
};
