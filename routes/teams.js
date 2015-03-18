var request = require('request');

var API = process.env.LANDLINE_API + '/teams/';

module.exports = function(router) {
  router.post('/teams/:slug', function(req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }

    request.put({
      // That trailing slash is important; without it, the API will
      // redirect the request and you won't get the response you expect
      url: API + req.params.slug + '/',
      json: true,
      body: req.body,
      auth: {
        bearer: req.user.token
      }
    }, function(err, response) {
      if (err) {
        return res.render('error');
      }

      res.redirect('/settings');
    });
  });
};
