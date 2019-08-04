/**
 * created by Yuxin Wei on 2019/7/30
 */
var logger = require('log4js').getLogger();
var jsonSeq = require('../util/jsonSeq');
var Category = require('../model/category');
var User = require('../model/user');

var CategoryService = {

    /**
     * 保存
     * @param id
     * @param name
     * @param description
     * @returns {Promise}
     */
    save: function (id, name, description) {

        return new Promise(function (resolve, reject) {
            Category.findOne({
                where:
                    {
                        id: id
                    }
            }).then(function (value) {
                logger.info(JSON.stringify(value))
                if (value) {
                    //更新
                    Category.update({name: name, description: description, updateTime: new Date()}, {
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
                    Category.build({
                        id: id,
                        name: name,
                        description: description,
                        updateTime: new Date(),
                        createTime: new Date()
                    }).save().then(function (res) {
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
     * 查询所有category
     */
    query: function () {
        return new Promise(function (resolve, reject) {

            Category.belongsTo(User, { foreignKey: 'createBy'})

            Category.findAll({
                attributes: ['id', 'name', 'description', 'updateTime', 'createTime'],
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
    },

    /**
     * 根据id删除category
     * @param id
     */
    delete: function (id) {
        return new Promise(function (resolve, reject) {
            Category.destroy({
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
}

module.exports = CategoryService;