/**
 * created by Yuxin Wei on 2019/7/31
 * 每日动态
 */
var express = require('express');
var router = express.Router();
const DailyService = require('../service/daily');
const jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();
var moment = require('moment');

/**
 * 保存类别
 */
router.post('/saveDailyDetail', function (req, res) {

    logger.info(JSON.stringify(req.body));
    var description = req.body.description;
    var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    if (description === '') {
        return res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    DailyService.save(description, date).then(function (value) {
        res.send(value)
    })
});

/**
 * 保存类别
 */
router.post('/getDailyList', function (req, res) {
    var start = req.body.pageStart;
    var limit = req.body.pageNumber;

    DailyService.query(start, limit).then(function (value) {
        res.send(value)
    })
});

module.exports = router;