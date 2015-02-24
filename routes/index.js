var bcrypt = require('bcrypt');
var express = require('express');
var request = require('request');

var SALT = process.env.SALT;
var SIGNUP_URL = process.env.LANDLINE_API + '/teams';

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Landline'
  });
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Landline | Signup' });
});

router.post('/signup', function(req, res) {
  if (!(req.body.email || req.body.password || req.body.name || req.body.url)) {
    return res.render('signup', {
      title: 'Landline | Signup',
      error: 'All fields are required'
    });
  }

  req.body.password = bcrypt.hashSync(req.body.password, SALT);

  request.post({
    url: SIGNUP_URL,
    json: true,
    body: JSON.stringify(req.body)
  }, function(err, response) {
    if (err) {
      return res.render('signup', {
        title: 'Landline | Signup',
        error: err.message
      });
    }

    req.session.teamName = req.body.name;
    req.session.jwt = response.body.token;

    res.render('index', {
      title: 'Landline',
      token: req.session.jwt
    });
  });
});

router.get('/chat', function(req, res) {
  res.render('chat', { title: 'Landline' });
});

module.exports = router;
