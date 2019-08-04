/**
 * created by Yuxin Wei on 2019/8/4
 */

var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var Article = require('../model/article');
var uuid = require('uuid/v4');

var ArticleService = {

    /**
     * 查询所有article
     */
    query: function () {
        return new Promise(function (resolve, reject) {
            Article.findAll({

            }).then(function (value) {
                logger.info(JSON.stringify(value))
                resolve(jsonSeq.success('SH-2001', value, '操作成功!'));
            }).catch(function (reason) {
                reject(jsonSeq.error('SH-4001', reason, '保存异常!'));
                process.exit(1)
            })
        }).catch(new Function())
    },

    /**
     * 上传文章
     * @param userId
     * @param title
     * @param category
     * @param tag
     * @param body
     */
    save: function (userId, title, category, tag, body) {

        return new Promise(function (resolve, reject) {
            Article.build({
                id: uuid(),
                userId: userId,
                title: title,
                category: category,
                tag: tag,
                updateTime: new Date(),
                createTime: new Date()
            }).save().then(function (res) {
                if (res) {
                    resolve(jsonSeq.success('SH-2001', res, '保存成功!'))
                }
            })
        })
    }
}

module.exports = ArticleService;