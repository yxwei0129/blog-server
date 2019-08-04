/**
 * created by Yuxin Wei on 2019/7/28
 * 新增、保存、删除标签
 */
var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var Tag = require('../model/tag');
var User = require('../model/user');

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
                logger.info(JSON.stringify(value))
                if (value) {
                    //更新
                    Tag.update({name: name, updateTime: new Date()}, {
                        where: {
                            id: id
                        }
                    }).then(function (res) {
                        if (res) {
                            resolve(jsonSeq.success('SH-2001', res, '保存成功!'))
                        }
                    })
                } else {
                    //插入
                    Tag.build({id: id, name: name, updateTime: new Date(), createTime: new Date()})
                        .save().then(function (res) {
                        if (res) {
                            resolve(jsonSeq.success('SH-2001', res, '保存成功!'))
                        }
                    })
                }
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
                    resolve(jsonSeq.success('SH-2001', value, '删除成功!'))
                }
            })
        })
    },

    /**
     * 查询所有tag
     */
    query: function () {
        return new Promise(function (resolve, reject) {
            Tag.belongsTo(User, { foreignKey: 'createBy'});

            Tag.findAll({
                attributes: ['id', 'name', 'updateTime', 'createTime'],
                include: {
                    model: User, // 关联查询
                    attributes: ['username','id']
                }
            }).then(function (value) {
                logger.info(JSON.stringify(value))
                resolve(jsonSeq.success('SH-2001', value, '操作成功!'));
            }).catch(function (reason) {
                reject(jsonSeq.error('SH-4001', reason, '保存异常!'));
                process.exit(1)
            })
        }).catch(new Function())
    }
};

module.exports = TagService;