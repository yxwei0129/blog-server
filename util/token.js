/**
 * created by Yuxin Wei on 2019/7/21
 * token 创建、验证 签名
 */
var jwt = require('jsonwebtoken');
var logger = require('log4js').getLogger();
var signkey = 'yxwei_node_express_vue_blog';
const jsonSeq = require('./jsonSeq');

exports.createToken = function (username, userid) {
    return new Promise(function (resolve, reject) {
        var token = jwt.sign({userName: username, userId: userid}, signkey, {
            expiresIn: 60 * 60 * 1 // 授权时效1小时
        });
        if (token) {
            resolve(token)
        } else {
            reject(token)
            process.exit(-1)
        }
    })

}

exports.vertifyToken = function (token, res, req) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, signkey, function (err, decode) {
            if (err) {
                logger.error(JSON.stringify(err));
                res.status(401).send(jsonSeq.error(401, 'invalid token', '认证失败，请重新登录!'));
            } else {
                // 解析必要的数据（相应字段为定义token时的字段）
                // logger.info(util.format('Decoded from JWT token: username - %s, orgname - %s', decode.username, decode.orgName));
                // 跳出中间件
                resolve(decode);
            }
        });
    })
}

exports.signkey = signkey;