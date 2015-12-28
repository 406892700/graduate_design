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
   // var user = new User(obj);
    User.find(obj,function(err,docs){
           //console.log(docs);
        callback(err,docs);
    });
};

userDao.prototype.login = function(obj,callback){
    //var user = new User(obj);
    console.log("密码"+obj.password);
    User.find(obj,function(err,docs){
        callback(err,docs);
    });
}

//����_id��ȡ�û���Ϣ
userDao.prototype.findUserById = function(_id,callcback){
    console.log('dao:����_id��ȡ�û���Ϣ');
    User.find({'_id':_id},function(err,docs){
        callcback(err,docs);
    });
}


userDao.prototype.updateStatus = function(obj1,obj2,callback){
    console.log('dao_');
    console.log(obj1);
    console.log(obj2);
    User.update(obj1,{'$set':obj2},function(err){
        callback(err);
    });
}

userDao.prototype.findUser = function(obj,callback){
    console.log('ddd');
    User.find(obj,function(err,docs){
        callback(err,docs);
    });
}

module.exports = new userDao();