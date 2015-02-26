var bcrypt = require('bcrypt');
var request = require('request');

var LOGIN_URL = process.env.LANDLINE_API + '/teams';
var SALT = process.env.SALT;

module.exports = function(router) {
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

    var password = req.body.password;
    req.body.password = bcrypt.hashSync(password, SALT);

    request.post({
      url: LOGIN_URL + '/' + req.body.name,
      json: true,
      body: req.body
    }, function(err, response, body) {
      if (err) {
        return res.render('signup', {
          title: 'Landline | Login',
          error: err.message
        });
      }

      var body = response.body;

      req.session.teamName = body.name;
      req.session.jwt = body.token;

      res.redirect('/teams/' + req.session.teamName);
    });
  });
};
