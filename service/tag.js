/**
 * created by Yuxin Wei on 2019/7/28
 * 新增、保存、删除标签
 */
var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var Tag = require('../model/tag');

var TagService = {

    /**
     * 新增、编辑保存，先判断是否存在id，若不存在则插入，存在直接更新
     * @param id
     * @param name
     */
    save: function (id, name) {
        return new Promise(function (resolve, reject) {
            //先查找
            Tag.findOne({
                where:
                    {
                        id: id
                    }
            }).then(function (value) {
                if (value) {
                    //更新
                    Tag.name = name;
                } else {
                    //插入
                    Tag.build({id: id, name: name, updateTime: new Date(), createTime: new Date(), createBy: 'yxwei'})
                }
                Tag.save().then(function (res) {
                    if (res) {
                        resolve(jsonSeq.success('SH-2002', res, '保存成功!'))
                    }
                })
            }).catch(function (reason) {
                reject(jsonSeq.error('SH-2001', reason, '保存异常!'));
                process.exit(1)
            })
        })
    },

    /**
     * 根据id删除tag
     * @param id
     */
    delete: function (id) {
        return new Promise(function (resolve, reject) {
            Tag.destroy({
                where: {
                    id: id
                }
            }).then(function (value) {
                if (value) {
                    resolve(jsonSeq.success('SH-2003', value, '删除成功!'))
                } else {
                    reject(jsonSeq.error('SH-2004', value, '删除失败!'))
                }
            })
        })
    }

};

module.exports = TagService;