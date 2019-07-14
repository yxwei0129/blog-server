var express = require('express');
var router = express.Router();
var atticle = require('../service/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getArticleList', function (req, res, next) {
    atticle.getArticleList(req, res, next);
});

module.exports = router;
