/**
 * Created by Administrator on 15-2-27.
 */

var Chapter = require("../model/chapter");

var chapterDao = function(){};

chapterDao.prototype.save  = function(obj,callback){//save方法
    var chapter = new Chapter(obj);
    chapter.save(function(err){
        callback(err);
    });
}

chapterDao.prototype.findByNovel  = function(_id,callback){//save方法
    Chapter.find({"chapter_novel":_id},function(err,docs){
        callback(err,docs);
    });
}

chapterDao.prototype.findByIndex_novel = function(obj,callback){
    Chapter.find({'chapter_index':obj.indexx,'chapter_novel':obj.novel},function(err,docs){
        callback(err,docs);
    });
}


module.exports = new chapterDao();