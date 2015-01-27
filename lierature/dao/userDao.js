/**
 * Created by Administrator on 15-1-24.
 */

var User = require("../model/user");

var userDao = function(){};

userDao.prototype.save  = function(obj,callback){//save方法
    var user = new User(obj);
    user.save(function(err){
        callback(err);
    });
};

userDao.prototype.ifExist = function(obj,callback){
    var user = new User(obj);
    User.find(obj,function(err,docs){
           //console.log(docs);
        callback(err,docs);
    })
}

module.exports = new userDao();