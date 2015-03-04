/**
 * Created by Administrator on 15-2-27.
 */

var Comment = require("../model/comment");

var commentDao = function(){};

commentDao.prototype.save  = function(obj,callback){//save方法
    var comment = new Comment(obj);
    comment.save(function(err){
        callback(err);
    });
}

commentDao.prototype.findByNovel  = function(_id,callback){//save方法
    Comment.find({"comment_from":_id},function(err,docs){
        callback(err,docs);
    });
}


module.exports = new commentDao();


