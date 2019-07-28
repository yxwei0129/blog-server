/**
 * created by Yuxin Wei on 2019/7/14
 * userModel
 */
//引入sequelize依赖
const Sequelize = require('sequelize');

//引入数据库配置信息
const sequelize = require('../core/mysql');

const User = sequelize.define('user', {//创建一个User对象
    id: {
        field: 'id',//对应数据库的名字
        primaryKey: true,//主键
        type: Sequelize.UUID //类型
    },
    username: {
        field: 'username',
        type: Sequelize.STRING(50)
    },
    password: {
        field: 'password',
        type: Sequelize.STRING(32)
    },
    phone: {
        field: 'phone',
        type: Sequelize.STRING(20)
    },
    city: {
        field: 'city',
        type: Sequelize.STRING(20)
    },
    email: {
        field: 'email',
        type: Sequelize.STRING(50)
    }
}, {
    tableName: 'user',//表名
    timestamps: false,//默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。请注意，如果您使用Sequelize迁移，则需要将createdAt和updatedAt字段添加到迁移定义中
});

module.exports = User;