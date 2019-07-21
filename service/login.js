/**
 * created by Yuxin Wei on 2019/7/20
 * 登录、推出服务
 */
const User = require('../model/user');
const Crypto = require('../util/crypto');
const JsonWrite = require('../util/output');
var logger = require('log4js').getLogger();
const jwt = require('jsonwebtoken');

const LoginService = {

        /**
         * 登录时需要将密码进行加密、后与数据库进行比对，采用MD5
         * @param loginName 用户名
         * @param password 密码
         */
        login: function (loginName, password) {
            return new Promise(function (resolve, reject) {
                    User.findAll({
                        where: {
                            username: loginName
                        }
                    }).then(function (result) {
                            if (result.length) {
                                const flag = Crypto.cryptoPassword(password) === result[0].password;
                                if (flag) {
                                    //验证通过
                                    logger.info('login success:' + JSON.stringify(result[0]));
                                    var secretKey = 'blog';
                                    var token = jwt.sign({namw: 'yxwei'}, secretKey, {
                                        expiresIn: 5 // 授权时效24小时
                                    });
                                    resolve(JsonWrite.success('', {token: token}, '')) //TODO 创建token
                                } else {
                                    //验证失败
                                    resolve(JsonWrite.error('用户名或密码错误!'));
                                }
                            }
                            else {
                                resolve(JsonWrite.error('用户名不存在!'));
                            }
                        }
                    );
                }
            ).catch(function (reason) {
                reject(reason)
                process.exit(1)
            })
        }
    }
;

module.exports = LoginService;