/**
 * Created by Administrator on 15-1-27.
 */

var userDao = require("../dao/userDao");
var crypto = require('crypto');
module.exports = function(app){
    //登录
    app.post("/loginNow",function(req,res){
        var user = req.body;
        var md5 = crypto.createHash('md5');
        var password = md5.update(user.password).digest('hex');
        userDao.login(user,function(err,docs){
            console.log(docs.length);
            if(err)
                res.redirect('/error_500');
            else if(docs.length == 0){
                //console.log('账号或密码错误！');
                res.redirect('/login')
            }else{
                //console.log('登录成功!');
                req.session.user = user;//写入session
                res.redirect('/');
            }
        });
    });

    //用户名的唯一性验证
    app.get("/check_exist",function(req,res){
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