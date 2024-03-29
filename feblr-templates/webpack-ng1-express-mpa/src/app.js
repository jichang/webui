var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nunjucks = require('nunjucks');

var config = require('./config');

var routes = require('./routes/index');

var app = express();

app.disable('x-powered-by');

// view engine setup
nunjucks.configure(path.join(__dirname, '..', '{{ prompt.viewsDir }}'), {
  noCache: config.env !== 'production',
  express: app,
  tags: {
    variableStart: '{$',
    variableEnd: '$}'
  }
});
app.set('views', path.join(__dirname, '..', '{{ prompt.viewsDir }}'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', '{{ prompt.distDir }}')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
