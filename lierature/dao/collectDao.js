/**
 * Created by Administrator on 15-3-31.
 */

var Collect = require("../model/collect_record");

var collectDao = function(){};

collectDao.prototype.save  = function(obj,callback){//save·½·¨

    var collect = new Collect(obj);
    collect.save(function(err,docs){
        //console.log('cnm!!!!!!');
        callback(err,docs);
    });
};

collectDao.prototype.ifExist = function(obj,callback){
	Collect.find({'collect_record_novel_id':obj.novel_id,'collect_record_user_id':obj.user_id},function(err,docs){
		callback(err,docs);
	});
};


collectDao.prototype.findRecordById = function(user_id,callback){
	Collect.find({'collect_record_user_id':user_id},function(err,docs){
		callback(err,docs);
	});
};

collectDao.prototype.deleteRecord = function(_id,callback){
	Collect.remove({'_id':_id},function(err,docs){
		callback(err,docs);
	});
};


module.exports = new collectDao();