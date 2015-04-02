/**
 * Created by Administrator on 15-1-24.
 */

var Read = require("../model/read_record");

var readDao = function(){};

readDao.prototype.save  = function(obj,callback){//save方法
    var read = new Read(obj);
    read.save(function(err){
        callback(err);
    });
}

readDao.prototype.findByUserId = function(user_id,callback){
    Read.find({'read_record_from_id':user_id},function(err,docs){
        callback(err,docs);
    });
}
module.exports = new readDao();