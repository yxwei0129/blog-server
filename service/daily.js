/**
 * created by Yuxin Wei on 2019/7/31
 */

var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var uuid = require('uuid/v1');
var DailyModel = require('../model/daily');

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
     */
    query: function () {
        return new Promise(function (resolve, reject) {

        }).catch(new Function())
    },

};

module.exports = DailyService;