var cors = require('cors');

module.exports = function(router) {
  router.get('/chat', cors(), function(req, res) {
    res.render('chat', {
      title: 'Landline'
    });
  });
};
