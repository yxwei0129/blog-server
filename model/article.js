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
        type: Sequelize.UUID
    },
    userId: {
        field: 'user_id', //博客作者id
        type: Sequelize.UUID
    },
    title: {
        field: 'title', //博客作者
        type: Sequelize.STRING
    },
    category: {
        field: 'category', //博客类别
        type: Sequelize.STRING
    },
    tag: {
        field: 'tag',
        type: Sequelize.STRING
    },
    updateTime: {
        field: 'update_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    createTime: {
        field: 'create_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    likeCount: {
        field: 'like_count', // 博客点赞数
        type: Sequelize.INTEGER,
        get: function () {
            return this.getDataValue('like_count').toString();
        }
    },
    commentCount: {
        field: 'comment_count', //博客评论个数
        type: Sequelize.INTEGER,
        get: function () {
            return this.getDataValue('comment_count').toString();
        }
    },
    imgSource: {
        field: 'img_source',
        type: Sequelize.STRING
    }
}, {
    timestamps: false,     // 不要添加时间戳属性 (updatedAt, createdAt)
    tableName: 'article',     // 定义表名
});

module.exports = Article;