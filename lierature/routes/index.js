
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'fff' });
//}

var userDao = require('../dao/userDao');

module.exports = function(app){
    //首页
    app.get("/",function(req,res){
        console.log(req.session.user.username);
        res.render("index/index",{'title':'1234s','user':req.session.user});
    });
    //注册页
    app.get("/reg",function(req,res){
        res.render('register/reg',{'name':'欢迎注册本站'});
    });

    //登陆页
    app.get("/login",function(req,res){
        res.render('login/login1',{'title':"登录"});
    });

    //后台错误 500
    app.get("/error_500",function(req,res){
        res.render('error/500',{});
    });

    //路径错误 404

    app.get('/error_404',function(req,res){
        res.render('error/404',{});
    });




//    app.get('*',function(req,res){
//       console.log(req.status);
//        res.render('error/404',{})
//    });



    //test

    app.get('/sendMail',function(req,res){
        res.render('sendMail',{});
    });

    app.get('/send_Mail',function(req,res){
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
            to: '2945371399@qq.com', // 接收者邮箱
            subject: '文学网站用户注册邮箱验证', //
            text: '请点击下面的链接已完成注册', // 邮件的文字内容
            html: "<a>"+ddd+"</a>" // 邮件的html部分内容
        };

        //用已经定义的邮件传送对象来发送邮件
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    });

}