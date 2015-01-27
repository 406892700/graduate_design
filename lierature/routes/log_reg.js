/**
 * Created by Administrator on 15-1-27.
 */

var userDao = require("../dao/userDao");

module.exports = function(app){
    app.post("/loginNow",function(req,res){
        var user = req.body;
        userDao.ifExist(user,function(err,flag){
            console.log(!!(err && flag.length == 0));
            !!(!err && flag.length == 0)?res.json('info','login faild!'):res.json({'info':'login success!'});
        });
    });

    app.get("/check_exist",function(req,res){
        console.log("---------------"+req.query.username);
        userDao.ifExist({'username':req.query.username},function(err,flag){
            console.log(flag);
            !!(!err && flag.length == 0)?res.json({'code':'0'}):res.json({'code':'1'});
        });
    });
}