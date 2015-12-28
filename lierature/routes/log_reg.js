/**
 * Created by Administrator on 15-1-27.
 */

var userDao = require("../dao/userDao");
var crypto = require('crypto');
module.exports = function(app){
    //登录
    app.get("/loginNow",function(req,res){
        var obj = req.query;
        if(!obj.return_url)
            obj.return_url = "";
        console.log(obj.return_url);
        var md5 = crypto.createHash('md5');
        var password = md5.update(obj.password).digest('hex');
        var user = {};
        user.username = obj.username;
        user.password = password;
        //console.log(req.body.username);
        userDao.login(user,function(err,docs){
            //console.log(docs.length);
            if(err)
                res.redirect('/error_500');
            else if(docs.length == 0){
                //console.log('账号或密码错误！');
                res.redirect('/login?return_url='+obj.return_url);
            }else{
                //console.log('登录成功!');
                req.session.user = docs[0];//写入session
                // for(var i =0;i<Object.getOwnPropertyNames(docs[0]).length;i++)
                //     console.log('输出看看user'+Object.getOwnPropertyNames(docs[0])[i]);
                // console.log("看看头像+"+req.session.user.pic);
                if(!obj.return_url)
                    res.redirect('/');
                else
                    res.redirect(obj.return_url); 
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
        var md5 = crypto.createHash('md5');//md5加密
        password = md5.update(req.body.password).digest('hex');
        var obj = {'username':username,'password':password};
        obj.user_type = '1';
        obj.status = '1';
        obj.remove_date = 'null';
        obj.pic = '/pic/user_pic/100.jpg';
        obj.sign = '该用户还未设置个性签名~~';
        obj.birthday = '';
        obj.reg_date = new Date();
        obj.exp = 0;
        obj.grade = 1;
        obj.personal_info = '请填写个人信息~~';
        userDao.save(obj,function(err){
            //err?res.json('info','register faild!'):res.json({'info':'register success!'});
            if(err){
                res.json('info','register faild!');
            }else{
                userDao.findUser(obj,function(err,docs){
                    if(err){
                        res.json('info','出错了！');
                        return;
                    }else{
                        req.session.user = docs[0];//写入session
                        res.redirect('/');
                    }
                });
                
            }
        });
    });

    //注销登录
    app.get('/quit_log',function(req,res){
        req.session.user = null;
        res.redirect('/login');
    });


}