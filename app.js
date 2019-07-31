var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var tag = require('./routes/tag');
var category = require('./routes/category');
var daily = require('./routes/daily');
var Auth = require('./util/token.js');
var expressJwt = require('express-jwt');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));//解析 x-www-form-urlencoded
app.use(bodyParser.json());//无法演示 解析json数据依赖于urlencoded模块 必须同时应用
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

var log4js = require('log4js');
log4js.configure({
    appenders: {cheese: {type: 'file', filename: 'logs/cheese.log'}},
    categories: {default: {appenders: ['cheese'], level: 'error'}}
});
var logger = log4js.getLogger();

logger.level = 'debug';
app.use(log4js.connectLogger(logger, {format: ':remote-addr :method :url :status :response-time ms'}));


//设置除login外，所有的api都要验证token
app.use(expressJwt({
    secret: Auth.signkey
}).unless({
    path: ['/management/login']//除了这个地址，其他的URL都需要验证
}));

// error handler
app.use(function (err, req, res, next) {
    var token = req.headers['token'];
    Auth.vertifyToken(token, res, req).then(function (value) {
        next()
    }).catch(function (reason) {
        next()
    })
});

app.use('/management',daily);
app.use('/management', login);
app.use('/management', tag);
app.use('/management', category);
module.exports = app;
