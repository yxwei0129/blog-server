/**
 * created by Yuxin Wei on 2019/7/13
 * 获取文章
 */
const Article = require('../model/article');

//为模型扩充方法

Article.findAll().then(function(project) {

    console.log(JSON.stringify(project));

});


