/**
 * created by Yuxin Wei on 2019/8/4
 */
var express = require('express');
var router = express.Router();
const ArticleService = require('../service/article');
const jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();

/**
 * 获取全部article
 */
router.get('/getArticleList', function (req, res) {
    ArticleService.query().then(function (value) {
        res.send(value)
    })
});

router.get('/test', function (req, res) {
    logger.info('获取测试数据开始')
    ArticleService.query().then(function (value) {
        logger.info(JSON.stringify(value))
        res.send(value)
    })
});

/**
 * 上传文章
 */
router.post('/uploadArticle', function (req, res) {
    var userId = req.body.userId;
    var title = req.body.title;
    var category = req.body.category;
    var tag = req.body.tag;
    var body = req.body.detail;

    if (userId === '' || title==='' || category === '' || tag === '' || body === '') {
        return res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    ArticleService.save(userId, title, category, tag, body).then(function (value) {
        res.send(value)
    })
});

module.exports = router;