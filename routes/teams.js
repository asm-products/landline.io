var request = require('request');

var API = process.env.LANDLINE_API + '/teams/';

module.exports = function(router) {
  router.post('/teams/:slug', function(req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }

    request.put({
      url: API + req.params.slug,
      json: true,
      body: req.body,
      headers: {
        Authorization: 'Bearer ' + req.user.token
      }
    }, function(err, response) {
      if (err) {
        return res.render('error');
      }

      res.redirect('/teams/' + req.params.slug);
    });
  });
};
