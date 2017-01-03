var Logger = require('../logger');
var logger = new Logger();

module.exports = function(req, res, next) {
  var beginTime = Date.now();

  res.on('finish', () => {
    var d = Date.now();
    logger.log('Response time: ' + (d - beginTime), {
      url: req.url,
      time: (d - beginTime)
    });
  });

  next();
}
