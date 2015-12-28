/**
 * Created by Administrator on 15-1-27.
 */

var userDao = require("../dao/userDao");
var crypto = require('crypto');
module.exports = function(app){
    //获取用户信息
    app.get('/get_user_info',function(req,res){
        console.log('获取用户信息');
        var _id = req.query._id;
        userDao.findUserById(_id,function(err,docs){
            if(err)
                console.log('info','出错了！');
            else
                res.json('content',docs[0]);//肯定只有一个
        });

    });

    //用户信息更新
    app.post('/update_user',function(req,res){
       var _id = "",temp = {};
    for(var i in req.body){
      //console.log(req.body[i]);
      if(i == "_id"){
        _id = req.body[i];
      }else{
         //var x = i.substring(5);
         temp[i] = req.body[i];
      }
    }
        console.log(temp);
        userDao.updateStatus({'_id':_id},temp,function(err,docs){
            if(err){
                console.log('错了！');
                return;
            }else{
                res.json('操作成功！');
            }
            
        });

    });

    //用户更改密码
    app.post('/update_pass',function(req,res){
        var md5 = crypto.createHash('md5');
        var _id = req.body._id;
        var password = md5.update(req.body.n_password).digest('hex');
        userDao.updateStatus({'_id':_id},{'password':password},function(err,docs){
            if(err){
                console.log('错了！');
                return;
            }else{
                res.json('操作成功！');
            }
            
        });
    });

    //让验证过码失效
    app.get('/quit_valide_code',function(req,res){
        req.session.valid_code = null;
        res.json('info','验证码已经失效！');
    });

    //验证验证码是否正确
    app.get('/valide_code',function(req,res){
        var _valid = req.query.valid;
        var trueValid = req.session.valid_code;
        console.log('真：'+trueValid+',假:'+_valid);

        if(_valid == trueValid){
            res.json({'code':1,'info':'验证码正确！'});
        }else{
            res.json({'code':2,'info':'验证码错误！'});
        }
    });



    //生成随机数
    var _getValideCode = function(){
        var r_list = [];
        for(var i=0;i<6;i++){
            r_list.push(parseInt(Math.random()*10));
        }
        return r_list.join('');
    }


    //获取邮箱验证码
    app.get('/send_Mail',function(req,res){
        var mail_address = req.query.address;//邮箱地址
        var valid_code = _getValideCode();
        var nodemailer = require('nodemailer');

        //创建一个可以重用的SMTP邮件发送对象
        var transporter = nodemailer.createTransport({
            service:'qq',//smtp服务商
            auth: {
                user: '406892700',//用户名
                pass: 'xhy15057142408'//密码
            }
        });

        //配置一个发送
        var mailOptions = {
            from: 'admin<406892700@qq.com>', //发送者邮箱
            to: mail_address, // 接收者邮箱
            subject: '文学网站用户注册邮箱验证', //
            text: '这是你的验证码', // 邮件的文字内容
            html: "<a>"+valid_code+"</a>" // 邮件的html部分内容
        };

        //用已经定义的邮件传送对象来发送邮件
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
                req.session.valid_code = valid_code;//将验证码写入session
                res.json({'code':valid_code});
            }
        });
    });

}