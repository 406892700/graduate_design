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

module.exports = new novelDao();