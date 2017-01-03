module.exports = function(err, req, res, next) {
  console.error(err);

  res.status(503).send(err.stack || err.message);
}
