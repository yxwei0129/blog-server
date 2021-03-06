/**
 * created by Yuxin Wei on 2019/7/16
 * 标签tag模型，
 */

//引入sequelize依赖
const Sequelize = require('sequelize');
var moment = require('moment');

//引入数据库配置信息
const sequelize = require('../core/mysql');
const Tag = sequelize.define('tag', {
    id: {
        field: 'id', //标签id
        primaryKey: true,
        type: Sequelize.STRING(21)
    },
    name: {
        field: 'name', //标签名称
        type: Sequelize.STRING
    },
    updateTime: {
        field: 'update_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    createTime: {
        field: 'create_time',
        type: Sequelize.DATE,
        get: function () {
            return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    createBy: {
        field: 'create_by',
        type: Sequelize.UUID,
        defaultValue: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf'
    }
}, {
    timestamps: false,     // 不要添加时间戳属性 (updatedAt, createdAt)
    tableName: 'tag'
});

module.exports = Tag;