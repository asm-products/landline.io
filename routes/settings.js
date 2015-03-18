module.exports = function(router) {
  router.get('/settings', function(req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }

    res.render('teams/settings', {
      title: 'Landline | ' + req.user.name,
      team: req.user
    });
  });
};
