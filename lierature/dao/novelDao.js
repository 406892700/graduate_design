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
    Novel.find({'novel_name':new RegExp(novel_name), 'novel_status' : '2'},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.findById = function(_id,callback){
     var seach_obj = _id?{'id':_id}:{};
    // Novel.find(seach_obj,callback,function(err,docs){
    //     callback(err,docs);
    // });
    Novel.find({'_id':_id},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.findByIdAndNotPass = function(_id,callback){
     var seach_obj = _id?{'_id':_id,'novel_status':'1'}:{'novel_status':'1'};
    Novel.find(seach_obj,callback,function(err,docs){
        callback(err,docs);
    });
}

// novelDao.prototype.findById2 = function()

novelDao.prototype.findByIdArray = function(id_array,callback){
    Novel.find({'_id':{'$in':id_array}},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.findByUserId = function(user_id,callback){
    Novel.find({'novel_author':user_id,'novel_status':'2'},function(err,docs){
        callback(err,docs);
    });
}

novelDao.prototype.updateZan = function(novel_id,num,callback){
    Novel.update({'_id':novel_id},{'$inc':{'novel_zan_num':num}},{'upsert': false},function(err){
        callback(err);
    });
}

novelDao.prototype.updateCollect = function(novel_id,num,callback){
    Novel.update({'_id':novel_id},{'$inc':{'novel_collection_num':num}},{'upsert':false},function(err){
        callback(err);
    });
}

// novelDao.prototype.getNum = function(novel_id,type){
//     Novel.find({'_id':novel_id},function(err,docs){
//         callback
//     });
// }

novelDao.prototype.getAllNovel = function(obj,callback){
    // Novel.find({},function(err,docs){
    //     callback(err,docs);
    // });
    Novel.find(obj).sort({'novel_zan_num':-1}).exec(callback);
}


novelDao.prototype.updateStatus = function(_id,status,callback){
    Novel.find({'_id':{'$in':_id}},function(err,docs){
        for(var i=0;i<docs.length;i++){
            Novel.update({'_id':docs[i]._id},{'$set':{'novel_status':status}},{'upsert': false},function(err){
                callback(err);
            });
        }
        
    });
}



novelDao.prototype.findRecommend = function(obj,callback){
    Novel.find(obj,function(err,docs){
        callback(err,docs);
    });
}


novelDao.prototype.updateNovel  =  function(obj1,obj2,callback){
    console.log(obj1);
    console.log(obj2);

    Novel.update(obj1,{'$set':obj2},function(err,docs){
        console.log(docs);
        callback(err,docs);
    });
}

module.exports = new novelDao();