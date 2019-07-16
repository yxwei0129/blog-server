/**
 * created by Yuxin Wei on 2019/7/16
 * mongodb 配置文件
 */
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/my_blog';

/**
 * 连接
 */
mongoose.connect(DB_URL, {autoIndex: false});

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;