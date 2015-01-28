
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'fff' });
//}

var userDao = require('../dao/userDao');

module.exports = function(app){
    app.get("/",function(req,res){
        console.log(req.session.user.username);
        res.render("index/index",{'title':'1234s','user':req.session.user});
    });

    app.get("/reg",function(req,res){
        res.render('register/reg',{'name':'欢迎注册本站'});
    });


    app.get("/login",function(req,res){
        res.render('login/login',{'title':"登录"});
    });

}