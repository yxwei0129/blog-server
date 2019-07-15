/**
 * created by Yuxin Wei on 2019/7/13
 * 获取文章
 */
const Article = require('../model/article');

//博客服务层
const ArticleService = {

    /**
     * 获取所有博客列表
     */
    getArticleList: function () {
        return new Promise(function (resolve, reject) {
            Article.findAll().then(function (project) {
                if (project) {
                    resolve(project);
                } else {
                    reject({
                        code: '1001',
                        info: '没有博客'
                    })
                }
            });
        });

    }
};
module.exports = ArticleService;



