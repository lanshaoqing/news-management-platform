var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 路由之前封装res.cc消息提示
app.use((req, res, next) => {
  res.cc = (err, code = 0) => {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 验证token
const JWT = require('./util/jwt')
app.use((req, res, next) => {
  if (req.url === '/adminapi/users/login') {
    next()
    return
  }
  const token = req.headers['authorization'].split(' ')[1]
  // 首先判断token，存在则解密并且用解密的字符重新生成新的token，不存在则返回401
  if (token) {
    let payload = JWT.verify(token)
    if (payload) {
      const newtoken = JWT.generate({ id: payload.id, username: payload.username }, '1d')
      res.header('Authorization', newtoken)
      next()
    } else {
      res.status(401).cc('token过期', 0)
    }
  }
  // next()
})

// 路由封装
// adminapi和webapi两种路由
const usersRouter = require('./router/admin/users')
app.use(usersRouter)

const newsRouter = require('./router/admin/news')
app.use(newsRouter)

const productsRouter = require('./router/admin/products')
app.use(productsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
