var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/article');
var users = require('./routes/users');
var login = require('./routes/login');

var token = require('./util/token_vertify.js');
var expressJwt = require('express-jwt');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (token == undefined) {
        next()
    } else {
        token.vertifyToken(token).then(function (value) {
            req.data = value;
            next()
        }).catch(function (reason) {
            next()
        })
    }
})

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: token.signkey
}).unless({
    path: ['/management/login','/management/logout']//除了这个地址，其他的URL都需要验证
}));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.status == 401) {
        res.status(401).send('token失效');
    }

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use('/', index);
app.use('/users', users);
app.use('/management', login);

module.exports = app;
