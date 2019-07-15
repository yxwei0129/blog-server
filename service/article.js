/**
 * created by Yuxin Wei on 2019/7/13
 * 获取文章
 */
const JsonWrite = require('../util/output');
const Article = require('../model/article');

//博客服务层
const ArticleService = {

    /**
     * 获取所有博客列表,按页查询
     * @param start 起始
     * @param limit 限制
     */
    getArticleList: function (start, limit) {
        return new Promise(function (resolve, reject) {
            Article.findAll(
                {
                    limit: limit,
                    offset: start * limit
                }
            ).then(function (project) {
                if (project) {
                    resolve(JsonWrite.success(project));
                }
            }, function (reason) {
                reject(JsonWrite.error(reason))
            });
        });

    }
};
module.exports = ArticleService;



