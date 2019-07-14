/**
 * created by Yuxin Wei on 2019/7/14
 * article模型，博客
 */
//引入sequelize依赖
const Sequelize = require('sequelize');
var moment = require('moment');

//引入数据库配置信息
const sequelize = require('../lib/mysql');

const Article = sequelize.define('ui_article', {
    id: {
        field: 'id', //博客id
        primaryKey: true,//主键
        type: Sequelize.UUID,
        get: function () {
            return this.getDataValue('id').toString();
        }
    },
    user_id: {
        field: 'article_user_id', //博客作者id
        type: Sequelize.UUID,
        get: function () {
            return this.getDataValue('user_id').toString();
        }
    },
    title: {
        field: 'article_title', //博客作者
        type: Sequelize.STRING
    },
    category: {
        field: 'article_category', //博客类别
        type: Sequelize.STRING
    },
    user_name: {
        field: 'article_author_name', //博客作者名称
        type: Sequelize.STRING
    },
    update_time: {
        field: 'update_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    create_time: {
        field: 'create_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    like_count: {
        field: 'article_like_count', // 博客点赞数
        type: Sequelize.INTEGER,
        get:function () {
            return this.getDataValue('like_count').toString();
        }
    },
    comment_count: {
        field: 'article_comment_count', //博客评论个数
        type: Sequelize.INTEGER,
        get:function () {
            return this.getDataValue('comment_count').toString();
        }
    },
    img_source: {
        field: 'article_img_source',
        type: Sequelize.STRING
    }
}, {
    timestamps: false,     // 不要添加时间戳属性 (updatedAt, createdAt)
    tableName: 'ui_article',     // 定义表名
});

module.exports = Article;