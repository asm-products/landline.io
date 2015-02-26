module.exports = function(router) {
  router.get('/chat', function(req, res) {
    res.render('chat', {
      apiUrl: process.env.LANDLINE_API,
      title: 'Landline'
    });
  });
};
