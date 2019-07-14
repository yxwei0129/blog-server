/**
 * created by Yuxin Wei on 2019/7/14
 * user 服务层，处理用户业务
 */

const user = require('../model/user');

user.sequelize.sync({force: false}).then(function (res) {
    debugger
    console.log("Server successed to start");
}).catch(function (err) {
    console.log("Server failed to start due to error: %s", err);
});