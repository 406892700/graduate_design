/**
 * Created by Administrator on 15-3-31.
 */

var Zan = require("../model/zan_record");

var zanDao = function(){};

zanDao.prototype.save  = function(obj,callback){//save·½·¨

    var zan = new Zan(obj);
    zan.save(function(err,docs){
        console.log('cnm!!!!!!');
        callback(err,docs);
    });
};


zanDao.prototype.ifExist = function(obj,callback){
    Zan.find({'collect_record_novel_id':obj.novel_id,'collect_record_user_id':obj.user_id},function(err,docs){
        callback(err,docs);
    });
};


zanDao.prototype.findRecordById = function(user_id,callback){
	Zan.find({'collect_record_user_id':user_id},function(err,docs){
		callback(err,docs);
	});
};

zanDao.prototype.findRecordByRecordId = function(_id,callback){
    Zan.find({'_id':_id},function(err,docs){
        callback(err,docs);
    });
};

zanDao.prototype.deleteRecord = function(_id,callback){
    Zan.remove({'_id':_id},function(err,docs){
        callback(err,docs);
    });
};

module.exports = new zanDao();