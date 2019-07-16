var express = require('express');
var router = express.Router();
var ArticleService = require('../service/article');

/**
 * 实现分页查询，第${ pageNum}页，每页${pagetotal}条数据
 */
router.get('/getArticleList', function (req, res) {

    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 5;

    ArticleService.getArticleList(start, limit).then(function (value) {
        res.json(value)
    }, function (reason) {
        res.json(reason)
    })
});

module.exports = router;
