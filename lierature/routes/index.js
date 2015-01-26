
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'fff' });
//}

var userDao = require('../dao/userDao');
var novelDao = require('../dao/novelDao');

module.exports = function(app){
    app.get("/",function(req,res){
        res.render("index",{'title':'1234s'});
    });

    app.get("/reg",function(req,res){
        res.render('reg',{'name':'欢迎注册本站'});
    });

    app.get("/addNovel_page",function(req,res){
        res.render('addNovel',{'name':"请添加小说"});
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

    app.post('/addNovel',function(req,res){
        var novel_name = req.body.novel_name;
        var novel_author = req.body.novel_author;
        console.log(novel_name+"   "+novel_author);
        var obj = {'novel_name':novel_name,'novel_author':novel_author};
        novelDao.save(obj,function(err){
            err?res.json('info','novel add faild!'):res.json('info','novel add successfully!');
        });
    });
}