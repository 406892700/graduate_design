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
}


module.exports = new zanDao();