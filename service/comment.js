/**
 * created by Yuxin Wei on 2019/8/3
 */

var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var CommentModel = require('../model/comment');

var CommentService = {

    /**
     * 根据主题id查询comment
     * @param id
     * @returns {Promise<any>}
     */
    query: function (id) {
        return new Promise(function (resolve, reject) {
            CommentModel.find({commentBelongs: id, deleteFlag: false}).then(function (value) {
                logger.info(JSON.stringify(value))
                resolve(jsonSeq.success('SH-2001', value, '操作成功!'));
            }).catch(function (reason) {
                reject(jsonSeq.error('SH-4001', reason, '保存异常!'));
                process.exit(1)
            })
        }).catch(new Function())
    },

    /**
     * 根据commentId删除评论
     * @param id
     */
    delete: function (id) {
        return new Promise(function (resolve, reject) {

            CommentModel.update({id: id}, {$set: {deleteFlag: true}}, function (value) {
                resolve(jsonSeq.success('SH-2001', value, '操作成功!'));
            }).catch(function (reason) {
                reject(jsonSeq.error('SH-4001', reason, '删除异常!'));
                process.exit(1)
            })
        }).catch(new Function())
    }
}

module.exports = CommentService