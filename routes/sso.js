var crypto = require('crypto');
var querystring = require('querystring');
var uuid = require('node-uuid');

var API = process.env.LANDLINE_API + '/sessions/sso';
var SECRET = process.env.LANDLINE_SECRET;
var TEAM = process.env.LANDLINE_TEAM;

module.exports = function(router) {
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
};

function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  next();
}

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
