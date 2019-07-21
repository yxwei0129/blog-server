/**
 * created by Yuxin Wei on 2019/7/21
 * token 创建、验证 签名
 */
var jwt = require('jsonwebtoken');
exports.signkey = 'yxwei_node_express_vue_blog';

exports.createToken = function (username, userid) {
    return new Promise(function (resolve, reject) {
        const token = jwt.sign({name: username, _id: userid}, signkey, {expiresIn: 10})
        resolve(token)
    })

}

exports.vertifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}