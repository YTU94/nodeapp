var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose'); 
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
// var index = require('./routes/index');
// var users = require('./routes/users');
var routes = require('./routes/index');

var app = express();

// session 中间件
app.use(session({
  name: 'blog',// 设置 cookie 中保存 session id 的字段名称
  secret: 'blog',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {maxAge: 6000000},// 过期时间，过期后 cookie 中的 session id 自动删除
  store:new MongoStore({url:'mongodb://localhost/blog'}),//将session储存到mongodb中
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
// set flash
app.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// 设置路由
routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
