/**
 * created by Yuxin Wei on 2019/7/13
 * 获取文章
 */
const JsonWrite = require('../util/output');
const Article = require('../model/article');
const BlogArticle = require('../model/detail');
const mongoose = require('mongoose');

//博客服务层
const ArticleService = {

    /**
     * 获取所有博客列表,按页查询
     * @param start 起始
     * @param limit 限制
     */
    getArticleList: function (start, limit) {

        var BlogMongo = mongoose.model('BlogMongo', BlogArticle);

        return new Promise(function (resolve, reject) {
            Article.findAll(
                {
                    limit: limit,
                    offset: start * limit
                }
            ).then(function (project) {
                console.log(project)
                if (project) {
                    new BlogMongo({
                        name: 'yxwei',
                        id: '1111111111',
                        html: '<head>第一个mongoose插入调试</head>'
                    }).save(function (res) {
                        console.log(res);
                        resolve(JsonWrite.success(project));

                    })
                }
            }, function (reason) {
                reject(JsonWrite.error(reason))
            });
        });

    }
};
module.exports = ArticleService;



