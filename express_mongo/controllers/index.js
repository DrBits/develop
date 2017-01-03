var Router = require('express').Router;
var app = new Router();

app.use(require('./home'));
module.exports = app;
