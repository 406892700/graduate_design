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
}

module.exports = new userDao();