/**
 * Created by Administrator on 15-1-24.
 */

var ApplyNovel = require("../model/apply_novel_record");

var applyNovelDao = function(){};

applyNovelDao.prototype.save  = function(obj,callback){//save方法
    var applyNovel = new ApplyNovel(obj);
    applyNovel.save(function(err){
        callback(err);
    });
};

applyNovelDao.prototype.findById = function(_id,callback){
    //arg_obj ==>   _id,pageSize,currentPage
    var seach_obj = _id?{'id':_id}:{};
    ApplyNovel.find(seach_obj,callback,function(err,docs){
        callback(err,docs);
    });
}


module.exports = new applyNovelDao();