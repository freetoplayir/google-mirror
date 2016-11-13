var express = require('express');
var router = express.Router();
var request = require('request');
var urlencode = require('urlencode');
var REQ_URL = require('../google');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var url;
    if (!req.query.q) {
        res.render('index');
        return;
    }
    url = REQ_URL;

    for (var i in req.query) {
        url = url + '&' + i + '=' + urlencode(req.query[i]);
    }
    console.log(url);

    request(url, function (err, response, body) {
        if (err && response.statusCode != 200) {
            res.render('index');
            return;
        }
        var para = JSON.parse(body);
        if (para.error) {
            res.render('index');
            return;
        }
        para.q = req.query.q;
        res.render('search', para);
    });

});

module.exports = router;
