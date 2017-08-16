var express = require('express');
var path = require('path');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var models = require('./models/models');
var User = models.User;
// require node modules here
// YOUR CODE HERE

var app = express();

// view engine setup


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Uncomment these out after you have implemented passport in step 1
// app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var port = 3000
app.listen(port, function(){
  console.log('Express started: listening on port ' + port)
})
// module.exports = app;
