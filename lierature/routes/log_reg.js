/**
 * Created by Administrator on 15-1-27.
 */

var userDao = require("../dao/userDao");
var crypto = require('crypto');
module.exports = function(app){
    //登录
    app.post("/loginNow",function(req,res){
        var user = req.body;
//        userDao.ifExist(user,function(err,flag){
//            //console.log(!!(err && flag.length == 0));
//            if(!!(!err && flag.length == 0)){
//                res.json({'info':'login failed!'});
//            }else{
//                res.json({'info':'login success!'});
//                req.session.user = user;
//                res.redirect("/");
//            }
//        });
        var md5 = crypto.createHash('md5');
        var password = md5.update(user.password).digest('hex');
        userDao.login(user,function(err,docs){
            console.log(docs);


        });
    });

    //用户名的唯一性验证
    app.get("/check_exist",function(req,res){
        //console.log("---------------"+req.query.username);
        userDao.ifExist({'username':req.query.username},function(err,flag){
            !!(!err && flag.length == 0)?res.json({'code':'0'}):res.json({'code':'1'});
        });
    });

    //注册
    app.post("/regnow",function(req,res){
        var username = req.body.username;
        var password;
        var md5 = crypto.createHash('md5');
        password = md5.update(req.body.password).digest('hex');
        var obj = {'username':username,'password':password};
        userDao.save(obj,function(err){
            err?res.json('info','register faild!'):res.json({'info':'register success!'});
        });
    });
}