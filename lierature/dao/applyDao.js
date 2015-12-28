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
    var seach_obj = _id?{'_id':_id}:{};
    Apply.find(seach_obj,callback,function(err,docs){
    	console.log(docs);
        callback(err,docs);
    });
};

//获取没有被审核的申请记录
applyDao.prototype.findByIdWithoutCheck = function(status,callback){
    var search_obj = status?{'Apply_record_status':status}:{};
    Apply.find(search_obj,callback,function(err,docs){
        callback(err,docs);
    });
};

//更改申请状态
applyDao.prototype.updateStatus = function(_id,status,callback){
    Apply.find({'_id':{'$in':_id}},function(err,docs){
        for(var i=0;i<docs.length;i++){
            Apply.update({'_id':docs[i]._id},{'$set':{'Apply_record_status':status}},{'upsert': false},function(err){
                callback(err);
            });
        }
        
    });
}

//查找novel——id
applyDao.prototype.findApply = function(obj,callback){
    Apply.find(obj,function(err,docs){
        callback(err,docs);
    });
}


module.exports = new applyDao();