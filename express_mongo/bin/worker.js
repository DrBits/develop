var express = require('express');

var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cons = require('consolidate');
var Logger = require('../logger');
var config = require('../config');

var logger = new Logger();

app.use(require('./rt'));

app.engine('html', cons.mustache);

app.set('view engine', 'html');

app.set('views', __dirname + '/../views');

require('./dbinit');

app.use(bodyParser.json({
  limit: '10kb'
}));

app.use(require('cookie-parser')());

app.use(session({
  secret: 'Himera',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(require('./../controllers'));

app.listen(3000, function(err) {
  if(err) throw err;
  logger.log(`Running server at port ${config.port}!`);
});

app.use(require('./errorHandler'));
