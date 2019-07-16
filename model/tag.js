/**
 * created by Yuxin Wei on 2019/7/16
 * 标签tag模型，
 */

//引入sequelize依赖
const Sequelize = require('sequelize');

//引入数据库配置信息
const sequelize = require('../lib/mysql');
const Tag = sequelize.define('tag', {

}, {
    timestamps: false,     // 不要添加时间戳属性 (updatedAt, createdAt)
    tableName: 'tag'
});

module.exports = Tag;