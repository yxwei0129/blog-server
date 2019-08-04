/**
 * created by Yuxin Wei on 2019/7/31
 * 每日动态
 */
var express = require('express');
var router = express.Router();
const DailyService = require('../service/daily');
const CommentService =require('../service/comment');
const jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();
var moment = require('moment');
var uuid = require('uuid/v4');

/**
 * 保存daily
 */
router.post('/saveDailyDetail', function (req, res) {

    logger.info(JSON.stringify(req.body));
    var description = req.body.description;
    var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    var id = uuid();

    if (description === '') {
        return res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    DailyService.save(id, description, date).then(function (value) {
        res.send(value)
    })
});

/**
 * 获取daily
 */
router.post('/getDailyList', function (req, res) {
    var start = req.body.pageStart;
    var limit = req.body.pageNumber;

    DailyService.query(start, limit).then(function (value) {
        res.send(value)
    })
});

/**
 * 获取daily下详情、评论
 */
router.post('/getDailyDetail', function (req, res) {
    var id = req.body.dailyId;

    CommentService.query(id).then(function (value) {
        res.send(value)
    })
});

/**
 * 删除daily下某个评论
 */
router.post('/deleteComment', function (req, res) {
    var id = req.body.id;
    console.log(id)

    CommentService.delete(id).then(function (value) {
        res.send(value)
    })
});

module.exports = router;