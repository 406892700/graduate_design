/**
 * Created by Administrator on 15-3-31.
 */

var Type = require("../model/novel_type");

var typeDao = function(){};

typeDao.prototype.save  = function(obj,callback){//save方法

    var type = new Type(obj);
    type.save(function(err,docs){
        //console.log('cnm!!!!!!');
        callback(err,docs);
    });
};



typeDao.prototype.findType = function(obj,callback){
    Type.find(obj,function(err,docs){
        callback(err,docs);
    });
};


//更新类型
typeDao.prototype.updateType = function(obj1,obj2,callback){
	Type.update(obj1,{'$set':obj2},{'upsert':false},function(err){
		callback(err);
	});
};

module.exports = new typeDao();