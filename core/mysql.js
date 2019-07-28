/**
 * created by Yuxin Wei on 2019/7/13
 * mysql 数据库配置
 */

//引入sequelize依赖
const Sequelize = require('sequelize');

const mysql = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_blog',
    port: 3306,
    dialect: 'mysql'
};

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: mysql.host,
    dialect: mysql.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,//最大连接池
        min: 0,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

module.exports = sequelize;//导出
