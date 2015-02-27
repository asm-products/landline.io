module.exports = function(router) {
  router.get('/logout', function(req, res) {
    req.logout();

    res.redirect('/');
  });
};
