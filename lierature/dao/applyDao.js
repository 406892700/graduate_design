/**
 * Created by Administrator on 15-1-24.
 */

var Apply = require("../model/apply_record");

var applyDao = function(){};

applyDao.prototype.save  = function(obj,callback){//save方法
    var apply = new Apply(obj);
    apply.save(function(err){
        callback(err);
    });
};

applyDao.prototype.findById = function(_id,callback){
    //arg_obj ==>   _id,pageSize,currentPage
    var seach_obj = _id?{'id':_id}:{};
    Apply.find(seach_obj,callback,function(err,docs){
        callback(err,docs);
    });
}


module.exports = new applyDao();