var bcrypt = require('bcrypt');
var crypto = require('crypto');
var request = require('request');

var SALT = process.env.SALT;
var SIGNUP_URL = process.env.LANDLINE_API + '/teams';

module.exports = function(router) {
  router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Landline | Signup' });
  });

  router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.url) {
      return res.render('signup', {
        title: 'Landline | Signup',
        error: 'All fields are required'
      });
    }

    var password = req.body.password;

    req.body.name = req.body.name.toLowerCase();
    req.body.password = bcrypt.hashSync(password, SALT);
    req.body.secret = crypto.randomBytes(48).toString('hex');

    request.post({
      url: SIGNUP_URL,
      json: true,
      body: req.body
    }, function(err, response) {
      if (err) {
        return res.render('signup', {
          title: 'Landline | Signup',
          error: err.message
        });
      }

      req.session.teamName = req.body.name;
      req.session.jwt = response.body.token;

      res.redirect('/');
    });
  });
};
