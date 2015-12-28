/**
 * Created by Administrator on 15-1-24.
 */

var Admin = require("../model/admin");

var adminDao = function(){};

adminDao.prototype.save  = function(obj,callback){//save方法
    var user = new User(obj);
    user.save(function(err){
        callback(err);
    });
};

adminDao.prototype.ifExist = function(obj,callback){
    Admin.find(obj,function(err,docs){
        callback(err,docs);
    });
};

adminDao.prototype.login = function(obj,callback){
    //var user = new User(obj);
    console.log("密码"+obj.password);
    Admin.find(obj,function(err,docs){
        callback(err,docs);
    });
}

module.exports = new adminDao();