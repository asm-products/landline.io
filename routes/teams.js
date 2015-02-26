var request = require('request');

var API = process.env.LANDLINE_API + '/teams/';
var SALT = process.env.SALT;

module.exports = function(router) {
  router.get('/teams/:slug', function(req, res) {
    request({
      url: API + req.params.slug,
      json: true,
      headers: {
        Authorization: 'Bearer ' + req.session.jwt
      }
    }, function(err, response) {
      if (err) {
        return res.render('error');
      }

      var body = response.body;

      res.render('teams/team', {
        title: 'Landline | ' + body.name,
        email: body.email,
        url: body.url,
        name: body.name,
        secret: body.secret
      });
    });
  });

  router.post('/teams/:slug', function(req, res) {
    request.put({
      url: API + req.params.slug,
      json: true,
      body: req.body,
      headers: {
        Authorization: 'Bearer ' + req.session.jwt
      }
    }, function(err, response) {
      if (err) {
        return res.render('error');
      }

      res.redirect('/teams/' + req.params.slug);
    });
  });
};
