var app = require('express')();

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Hello, world!'});
});

module.exports = app;
