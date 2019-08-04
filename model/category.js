/**
 * created by Yuxin Wei on 2019/7/16
 * 博客类别
 */
//引入sequelize依赖
const Sequelize = require('sequelize');
var moment = require('moment');

//引入数据库配置信息
const sequelize = require('../core/mysql');

const Category = sequelize.define('category', {
        id: {
            field: 'id', //类别id
            primaryKey: true,//主键
            allowNull: false,
            type: Sequelize.STRING
        },
        name: {
            field: 'name', //类别名称
            type: Sequelize.STRING
        },
        description: {
            field: 'description',//类别详细描述
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
            type:Sequelize.UUID,
            defaultValue: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf'
        }
    }, {
        timestamps: false,     // 不要添加时间戳属性 (updatedAt, createdAt)
        tableName: 'category'
    }
);

module.exports = Category;