/**
 * created by Yuxin Wei on 2019/7/20
 * login
 */

var express = require('express');
var router = express.Router();
const LoginService = require('../service/login');

const JsonWrite = require('../util/output');

router.get('/login', function (req, res) {

    var loginName = req.query.loginName;
    var password = req.query.password;

    LoginService.login(loginName, password).then(function (value) {
        res.send(value)
    })
});

router.get('/logout', function (req, res) {
    res.send('logout')
})


module.exports = router;