/**
 * Created by Administrator on 15-2-27.
 */

var Comment = require("../model/comment");

var commentDao = function(){};

commentDao.prototype.save  = function(obj,callback){//saveæ–¹æ³•
    var comment = new Comment(obj);
    comment.save(function(err){
        callback(err);
    });
}

commentDao.prototype.findByNovel  = function(_id,callback){//saveæ–¹æ³•
    Comment.find({"comment_from":_id},function(err,docs){
        callback(err,docs);
    });
}

commentDao.prototype.removeComment = function(obj,callback){//É¾³ýÆÀÂÛ
	Comment.remove(obj,function(err,docs){
		callback(err,docs);
	});
}


module.exports = new commentDao();


