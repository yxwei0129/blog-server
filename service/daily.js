/**
 * created by Yuxin Wei on 2019/7/31
 */

var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var uuid = require('uuid/v1');
var DailyModel = require('../model/daily');
var async = require('async');

var DailyService = {


    /**
     *  新建daily
     * @param detail 详细内容
     * @returns {Promise}
     */
    save: function (detail, date) {

        return new Promise(function (resolve, reject) {

            //每日实体
            var dailyEntity = new DailyModel({
                id: uuid(),
                insert_time: date,
                body: detail
            });

            dailyEntity.save(function (err, docs) {
                if (err) console.log(err);
                resolve(jsonSeq.success('SH-2001', docs, '保存成功!'))
            })
        })

    },

    /**
     * 查询daily
     * @param start
     * @param limit
     * @returns {Promise<any>}
     */
    query: function (start, limit) {
        var pageStart = parseInt(start || 1);
        var pageNumber = parseInt(limit || 5);

        return new Promise(function (resolve, reject) {
            // 查询
            async.parallel({
                total: function (done) { // 查总数
                    DailyModel.count().exec(function (err, count) {
                        done(err, count);
                    });
                },
                list: function (done) { //按页
                    DailyModel.find().skip((pageStart - 1) * pageNumber).limit(pageNumber).sort({insert_time: -1}).exec(function (error, doc) {
                        done(error, doc);
                    });
                }
            }, function (err, result) {
                logger.info(JSON.stringify(result))
                resolve(jsonSeq.success('SH-2001', result, '操作成功!'));
            })
        }).catch(new Function())
    },

};

module.exports = DailyService;