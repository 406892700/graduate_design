/**
 * Created by Administrator on 15-1-24.
 */

var Read = require("../model/read_record");

var readDao = function(){};

readDao.prototype.save  = function(obj,callback){//saveæ–¹æ³•
    var read = new Read(obj);
    read.save(function(err){
        callback(err);
    });
};

readDao.prototype.findByUserId = function(user_id,callback){
    Read.find({'read_record_from_id':user_id},function(err,docs){
        callback(err,docs);
    });
};

readDao.prototype.findRecordByRecordId = function(_id,callback){
    Read.find({'_id':_id},function(err,docs){
        callback(err,docs);
    });
};

readDao.prototype.deleteRecord = function(_id,callback){
    Read.remove({'_id':_id},function(err,docs){
        callback(err,docs);
    });
};

readDao.prototype.ifExist = function(obj,callback){
    Read.find(obj,function(err,docs){
        callback(err,docs);
    });
};

readDao.prototype.updateDate = function(obj,callback){
    console.log('++++++++++++++++++++++++++++++¿´¿´Ö´ÐÐÁËÃ»');
    Read.update(obj,{'$set':{'read_date':new Date()}},{'upsert':false},function(err,docs){
        callback(err,docs);
    });
};

readDao.prototype.update = function(obj1,obj2,callback){
    console.log('更新');
    Read.update(obj1,{'$set':obj2},{'upsert':false},function(err,docs){
        callback(err,docs);
    });
}



module.exports = new readDao();