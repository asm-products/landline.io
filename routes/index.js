var bcrypt = require('bcrypt');
var crypto = require('crypto');
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var uuid = require('node-uuid');

var API = process.env.LANDLINE_API + '/sessions/sso';
var LOGIN_URL = process.env.LANDLINE_API + '/teams/landline';
var SALT = process.env.SALT;
var SECRET = process.env.LANDLINE_SECRET;
var SIGNUP_URL = process.env.LANDLINE_API + '/teams';
var TEAM = process.env.LANDLINE_TEAM;

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Landline',
    token: req.session && req.session.token
  });
});

router.get('/sso', allowCors, function(req, res) {
  var nonce = extractNonce(req.query);
  var values = {
    nonce: nonce,
    team: TEAM,
    id: uuid.v4(),
    avatar_url: 'http://i.imgur.com/yyZwINK.jpg',
    username: +Date.now()
  };
  var query = querystring.stringify(values);
  var payload = new Buffer(query).toString('base64');
  var mac = sign(payload);
  var url = API + '?payload=' + querystring.escape(payload) +
    '&sig=' + mac;

  res.redirect(url);
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Landline | Login' });
});

router.post('/login', function(req, res) {
  if (!(req.body.email || req.body.password)) {
    return res.render('login', {
      title: 'Landline | Login',
      error: 'All fields are required'
    });
  }

  req.body.password = bcrypt.hashSync(req.body.password, SALT);

  request.post({
    url: LOGIN_URL,
    json: true,
    body: req.body
  }, function(err, response) {
    if (err) {
      return res.render('signup', {
        title: 'Landline | Login',
        error: err.message
      });
    }

    req.session.teamName = req.body.name;
    req.session.jwt = response.body.token;

    res.redirect('/');
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

  req.body.name = req.body.name.toLowerCase();
  req.body.password = bcrypt.hashSync(req.body.password, SALT);
  req.body.secret = SECRET;

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

router.get('/chat', function(req, res) {
  res.render('chat', {
    apiUrl: process.env.LANDLINE_API,
    title: 'Landline'
  });
});

module.exports = router;

function extractNonce(query) {
  var payload = query.payload;
  var sig = query.sig;

  if (sign(payload) !== sig) {
    return false;
  }

  var raw = new Buffer(payload, 'base64').toString();
  var values = querystring.parse(raw);

  return values.nonce;
}

function sign(payload) {
  var mac = crypto.createHmac('sha256', SECRET);

  mac.update(payload);

  return mac.digest('hex');
}

function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  next();
}
