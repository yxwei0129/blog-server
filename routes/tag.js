/**
 * created by Yuxin Wei on 2019/7/28
 * 标签
 */
var express = require('express');
var router = express.Router();
const TagService = require('../service/tag');
const jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();

/**
 * 获取全部标签
 */
router.get('/getTagList', function (req, res) {
    TagService.query().then(function (value) {
        res.send(value)
    })
});

/**
 * 保存标签、新增标签共用
 */
router.post('/saveTag', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    logger.info(JSON.stringify(req.body));
    if (id === '' || name === '') {
       return res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    TagService.save(id, name).then(function (value) {
        res.send(value)
    })
});

/**
 * 根据id删除tag
 */
router.post('/deleteTag', function (req, res) {
    var id = req.body.id;
    if (id === '') {
        res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    TagService.delete(id).then(function (value) {
        res.send(value)
    })
});

module.exports = router;