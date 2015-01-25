
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'fff' });
//}

var userDao = require('../dao/userDao');

module.exports = function(app){
    app.get("/",function(req,res){
        res.render("index",{'title':'1234s'});
    });

    app.get("/reg",function(req,res){
        res.render('reg',{'name':'欢迎注册本站'});
    });

    app.post("/regnow",function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        var obj = {'username':username,'password':password};
        userDao.save(obj,function(err){
            err?res.json('info','register faild!'):res.json({'info':'register success!'});
        });
//        console.log(username + "  "+password);
       // res.json({'info':'register success!'});
    });
}