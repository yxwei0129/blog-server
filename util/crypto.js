/**
 * created by Yuxin Wei on 2019/7/20
 * 加密
 */
const crypto = require('crypto');

const Crypto = {

    /**
     * 密码MD5加密
     * @param password
     */
    cryptoPassword: function (password) {
        return crypto.createHash("md5").update(password).digest('hex');  //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称,加密后的值d
    }
};

module.exports = Crypto;