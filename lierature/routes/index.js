
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'fff' });
//}

var userDao = require('../dao/userDao');
var adDao = require('../dao/adDao');
var novelDao = require('../dao/novelDao');

module.exports = function(app){
    //首页
    app.get("/",function(req,res){
        adDao.findAds({},function(err,docs){
            console.log(docs);
            res.render("index/index",
            {'title':'1234s','user':req.session.user,'ad':docs});
        });
        
    });
    //注册页
    app.get("/reg",function(req,res){
        res.render('register/reg',{'name':'欢迎注册本站','user':req.session.user});
    });

    //登陆页
    app.get("/login",function(req,res){
        res.render('login/login1',{'title':"登录",'user':req.session.user});
    });

    //作者专区
    app.get('/author',function(req,res){
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        res.render('author/author',{'title':'作者专区','user':req.session.user});
    });

    //读者个人中心
    app.get('/reader_center',function(req,res){
        if(!req.session.user){
            res.render('login/login1',{'title':"登录",'user':null});
            return;
        }
            
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });

    //作者个人中心
    app.get('/author_center',function(req,res){
        console.log("输出名字==="+req.session.user);
        console.log("输出_id==="+req.session.user._id);
        res.render('author_center/author_center',{'title':'作者个人中心','user':req.session.user});
    });

    //网站后台登录
    app.get('/admin_log',function(req,res){
        res.render('admin/admin_log',{'title':'后台登录'})
    });


    //网站后台
    app.get('/admin',function(req,res){
        res.render('admin/admin',{'title':'网站后台','user':req.session.user});
    });

    //后台错误 500
    app.get("/error_500",function(req,res){
        res.render('error/500',{});
    });

    //路径错误 404

    app.get('/error_404',function(req,res){
        res.render('error/404',{});
    });

    //test

    app.get('/sendMail',function(req,res){
        res.render('sendMail',{});
    });


    app.get('/get_recommont',function(req,res){
        novelDao.findRecommend({},function(err,docs){
            var temp = docs.length >= 5?Array.prototype.splice.call(docs,0,5)
                                        :docs;
            res.json(temp);
        });
    });
   

}