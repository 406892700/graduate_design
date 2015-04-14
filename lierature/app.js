
/**
 * Module dependencies.
 */

var express = require('express');

/*------------所有的路由控制 start-------------------*/
var routes = require('./routes');//index.js主要用于控制页面之间的跳转
var validate = require('./routes/validate');//用于各种验证
var log_reg = require('./routes/log_reg');//登录注册
var novel= require("./routes/novel");//小说相关
var chapter = require("./routes/chapter");//章节相关
var comment = require("./routes/comment");//评论相关
var record = require("./routes/record");//各种记录相关
var admin = require("./routes/admin")//后台相关
/*------------所有的路由控制 end-------------------*/

var http = require('http');
var path = require('path');
ejs = require('ejs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);//设置监听3000端口
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);//让html后缀的模板能具备ejs的功能
app.set('view engine', 'html');//更改模板引擎为html
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.bodyParser({keepExtensions:true,uploadDir:'./public/images'}));
app.use(app.router);



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

//引用路由规则
routes(app);
validate(app);
log_reg(app);
novel(app);
chapter(app);
comment(app);
record(app);
admin(app);
http.createServer(app).listen(app.get('port'), function(){
  console.log('监听了localhost: ' + app.get('port')+
 "\n-------------------------------------------------------------------------------------------");
});
