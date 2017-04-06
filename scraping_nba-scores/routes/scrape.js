var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  var url = 'http://www.basketball-reference.com/boxscores/';

  var query = {
    month: 4,
    day: 2,
    year: 2017
  }

  superagent
  .get(url)
  .query(query)
  .end(function(err, response) {
    if(err) {
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }

    $ = cheerio.load(response.text);
    var scores = [];
    var game = {};
    $('tr').each(function(i, element){
      var className = element.attribs.class;
      if(className === 'winner' || className === 'loser') {
        var td = element.children[1];
        if(td.children != null) {
          var anchor = td.children[0];
          var team = anchor.children[0].data;
          
          var tdScore = element.children[3];
          var score = tdScore.children[0].data;
          

          game[team] = score;
          if(Object.keys(game).length == 2) {
          scores.push(game);
          game = {}
          }
        }
      }
    });

    res.send(scores)
  })


});

module.exports = router;
