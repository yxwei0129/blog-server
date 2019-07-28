/**
 * created by Yuxin Wei on 2019/7/20
 * 登录、退出服务
 */
var User = require('../model/user');
var Crypto = require('../util/crypto');
var jsonSeq = require('../util/jsonSeq');
var logger = require('log4js').getLogger();
var jwtUti = require('../util/token');

var LoginService = {

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
                                    jwtUti.createToken(loginName, password).then(function (value) {
                                        resolve(jsonSeq.success('SH-1003', {token: value}, '登录成功!'));
                                        logger.info(JSON.stringify(result[0]));
                                    })
                                } else {
                                    //验证失败
                                    resolve(jsonSeq.success('SH-1002', '', '用户名或密码错误!'));
                                }
                            }
                            else {
                                resolve(jsonSeq.success('SH-1002', '', '用户名或密码错误!'));
                            }
                        }
                    );
                }
            ).catch(function (reason) {
                reject(jsonSeq.error('SH-1004',reason,'登录异常!'));
                process.exit(1)
            })
        }
    }
;

module.exports = LoginService;