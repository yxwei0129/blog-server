/**
 * created by Yuxin Wei on 2019/7/30
 */
var express = require('express');
var router = express.Router();
const CategoryService = require('../service/category');
const jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();

/**
 * 保存类别
 */
router.post('/saveCategory', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;

    logger.info(JSON.stringify(req.body));
    if (id === '' || name === '') {
        return res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    CategoryService.save(id, name, description).then(function (value) {
        res.send(value)
    })
});

/**
 * 获取全部类别
 */
router.get('/getCategoryList', function (req, res) {
    CategoryService.query().then(function (value) {
        res.send(value)
    })
});

/**
 * 根据id删除category
 */
router.post('/deleteCategory', function (req, res) {
    var id = req.body.id;
    if (id === '') {
        res.send(jsonSeq.success('SH-1001', '', '标签必填参数为空!'))
    }
    CategoryService.delete(id).then(function (value) {
        res.send(value)
    })
});

module.exports = router;