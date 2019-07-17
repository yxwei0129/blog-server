/**
 * created by Yuxin Wei on 2019/7/17
 * 写入mongodb HTML文本
 */

//博客详情model
const BlogDetail = require('../model/detail');

const DetailService = {

    /**
     * 插入博客详细，为富文本标签，对应mysql中的detailId
     * @param id ,博客id
     * @param html 富文本
     */
    save: function (id, html) {

        return new Promise(function (resolve, reject) {
            new BlogDetail({
                articleId: id,
                blogDetail: html,
                deleteFlag: false
            }).save(function (err) {
                if (err) {
                    reject(new Error('error'));
                    process.exit(1) // To exit with a 'failure' code
                }
                resolve();
            })
        }).catch(new Function())
    },

    /**
     * 博客id,需要判断逻辑删除
     * @param id
     */
    findOne: function (id) {

        return new Promise(function (resolve, reject) {
            BlogDetail.findOne({articleId: id, deleteFlag: false}, function (err, result) {
                if (err) {
                    reject(new Error('error'));
                    process.exit(1)
                }
                resolve(result);
            })
        })
    },

    /**
     * 根据id更新
     * @param id
     */
    update: function (id, obj) {

        return new Promise(function (resolve, reject) {
            BlogDetail.updateOne({articleId: id}, obj, function (err) {
                if (err) {
                    reject(new Error('error'));
                    process.exit(1)
                }
                resolve({msg: '更新成功!'});
            })
        })

    },

    /**
     * 根据id删除，逻辑删除，deleteFlag置为1
     * @param id
     */
    removeOne: function (id) {

        return new Promise(function (resolve, reject) {
            BlogDetail.update({articleId: id}, {deleteFlag: true}, function (err) {
                if (err) {
                    reject(new Error('error'));
                    process.exit(1)
                }
                resolve({msg: '删除成功!'});
            })
        })
    }


};

module.exports = DetailService;