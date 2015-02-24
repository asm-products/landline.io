var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Landline' });
});

router.get('/chat', function(req, res) {
  res.render('chat', { title: 'Landline' });
});

module.exports = router;
