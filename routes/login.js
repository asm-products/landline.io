var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var request = require('request');

var LOGIN_URL = process.env.LANDLINE_API + '/teams';
var SALT = process.env.SALT;

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(name, password, done) {
    if (!name || !password) {
      return done(new Error('All fields are required'));
    }

    var _password = bcrypt.hashSync(password, SALT);
    var _body = {
      name: name,
      password: _password
    };

    request.post({
      url: LOGIN_URL + '/' + name,
      json: true,
      body: _body
    }, function(err, response, body) {
      if (err) {
        return done(err);
      }

      done(null, response.body);
    });
  }
));

passport.serializeUser(function(team, done) {
  done(null, team);
});

passport.deserializeUser(function(team, done) {
  if (!team.token) {
    return done(null, false);
  }

  request.get({
    url: LOGIN_URL + '/' + team.name,
    json: true,
    auth: {
      bearer: team.token
    }
  }, function(err, response, body) {
    if (err) {
      return done(err);
    }

    // attach the token to the deserialized user
    response.body.token = team.token;

    done(null, response.body);
  });
});

module.exports = function(router) {
  router.get('/login', function(req, res) {
    res.render('login', { title: 'Landline | Login' });
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
};
