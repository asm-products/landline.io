var bcrypt = require('bcrypt');
var crypto = require('crypto');
var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Landline',
    team: req.user
  });
});

require('./chat')(router);
require('./login')(router);
require('./logout')(router);
require('./signup')(router);
require('./sso')(router);
require('./teams')(router);

module.exports = router;
