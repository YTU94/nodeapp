// var express = require('express');
// var router = express.Router();
// var app = express()
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('test', { title: 'hello world' });
// });

// module.exports = router;
module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index',{ title: '首页' });
  });
  app.get('/test', function(req, res, next) {
    res.render('test', { title: 'test' })
  });
}
