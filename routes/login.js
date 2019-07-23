/**
 * created by Yuxin Wei on 2019/7/20
 * login
 */

var express = require('express');
var router = express.Router();
const LoginService = require('../service/login');

const jsonSeq = require('../util/jsonSeq');

router.get('/login', function (req, res) {
    var loginName = req.query.loginName;
    var password = req.query.password;
    if (loginName === '' || password === '') {
        res.send(jsonSeq.success('SH-1001', '', '用户名或密码为空!'))
    }
    LoginService.login(loginName, password).then(function (value) {
        res.send(value)
    })
});

router.get('/logout', function (req, res) {
    res.send({data: Math.random()})
})


module.exports = router;