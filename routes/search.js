var express = require('express');
var router = express.Router();
var request = require('request');
var urlencode = require('urlencode');
var KEY = 'AIzaSyDAlPOPOTGF_bJqlVorAxdoRDkTzjOXAVw';
var CX = '000435555281666006490:txkz-gj5tuy';
var REQ_URL = 'https://www.googleapis.com/customsearch/v1?' +
    // 'prettyPrint=false' +
    'key=' + KEY +
    '&cx=' + CX;

/* GET users listing. */
router.get('/',  function(req, res, next) {
  var url;
  if (req.query.q) {
    url = REQ_URL;

    for (var i in req.query) {
      url = url + '&' + i + '=' + urlencode(req.query[i]);
    }
    console.log(url);

    request(url, function (err, response, body) {
      var para;

      if (!err && response.statusCode == 200) {
        para = JSON.parse(body);

        if (para.error) {
          res.render('index');
        } else {
          para.q = req.query.q;
          res.render('search', para);
        }

      } else {
        res.render('index');
      }
    });

  } else {
    res.render('index');
  }
});

module.exports = router;
