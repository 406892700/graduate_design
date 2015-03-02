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
    })
}

module.exports = new novelDao();