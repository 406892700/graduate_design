/**
 * Created by Administrator on 15-3-31.
 */

var Ad = require("../model/ad");

var adDao = function(){};

adDao.prototype.save  = function(obj,callback){//save����
    var ad = new Ad(obj);
    ad.save(function(err,docs){
        console.log('cnm!!!!!!');
        callback(err,docs);
    });
};

//���ҹ��
adDao.prototype.findAds = function(obj,callback){
    Ad.find(obj,function(err,docs){
        callback(err,docs);
    });
}

//���¹��
adDao.prototype.updateAd = function(obj1,obj2,callback){
	 Ad.update(obj1,{'$set':obj2},{'upsert':false},function(err){
        callback(err);
    });
}

//ɾ�����
adDao.prototype.removeAd = function(obj,callback){
	Ad.remove(obj,function(err){
		callback(err);
	});
}


module.exports = new adDao();