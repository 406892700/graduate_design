/**
 * Created by Administrator on 15-1-24.
 */

var Novel = require("../model/novel");

var novelDao = function(){};

novelDao.prototype.save  = function(obj,callback){//save方法
    var novel = new Novel(obj);
    novel.save(function(err){
        callback(err);
    });
}

novelDao.prototype.findByName = function(novel_name,callback){
    Novel.find({'novel_name':new RegExp(novel_name)},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.findById = function(_id,callback){
    Novel.find({'_id':_id},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.findByUserId = function(user_id,callback){
    Novel.find({'novel_author':user_id},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.updateZan = function(novel_id,callback){
    Novel.update({'_id':novel_id},{'$inc':{'novel_zan_num':1}},{'upsert': false},function(err){
        callback(err);
    });
}

novelDao.prototype.updateCollect = function(novel_id,callback){
    Novel.update({'_id':novel_id},{'$inc':{'novel_collection_num':1}},{'upsert':false},function(err){
        callback(err);
    });
}

// novelDao.prototype.getNum = function(novel_id,type){
//     Novel.find({'_id':novel_id},function(err,docs){
//         callback
//     });
// }
module.exports = new novelDao();