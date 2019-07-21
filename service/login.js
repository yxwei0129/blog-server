/**
 * created by Yuxin Wei on 2019/7/20
 * 登录、推出服务
 */
var User = require('../model/user');
var Crypto = require('../util/crypto');
var JsonWrite = require('../util/jsonSeq');
var logger = require('log4js').getLogger();
var jwtUti=require('../util/token');

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
                                    jwtUti.createToken(loginName,password).then(function (value) {
                                        resolve(JsonWrite.success('', {token: value}, '')) //TODO 创建token
                                        logger.info('login success:' + JSON.stringify(result[0]));
                                    })
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