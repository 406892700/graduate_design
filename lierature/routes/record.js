/**
 * Created by Administrator on 15-2-27.
 */
var collect_recordDao = require('../dao/collectDao');
var zan_recordDao = require('../dao/zanDao');
var read_recordDao = require('../dao/readDao');
var novelDao = require('../dao/novelDao');

module.exports = function(app){
  //收藏记录页面
    app.get('/lookCollectRecord',function(req,res){
        console.log('去看收藏记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });
    //点赞记录页面
    app.get('/lookZanRecord',function(req,res){
        console.log('去看点赞记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });

    //收藏记录页面
    app.get('/lookReadRecord',function(req,res){
        console.log('去看阅读记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });

    //获取收藏记录
    app.get('/getCollectRecord',function(req,res){
        console.log('getCollectRecord');
        //res.json('info','dsdfs');
          var user_id = req.query.user_id || req.session.user._id,
              record_pageNum = parseInt(req.query.record_pageNum),
              record_pageSize = parseInt(req.query.record_pageSize);
          collect_recordDao.findRecordById(user_id,function(err,docs){
            var start_p = (record_pageNum-1)*record_pageSize;
            var end_p = record_pageNum*record_pageSize;
            console.log(start_p +"mmmmmmmmmmmmm" +end_p)
            if(!err){
                 end_p = (end_p > docs.length)?(docs.length):(end_p);
                 var id_list = [],
                     date_list = [],
                     record_id_list = [];
                 docs.slice(start_p,end_p).map(function(v,i){
                    id_list.push(v.collect_record_novel_id);
                    date_list.push(v.collect_record_date);
                    record_id_list.push(v._id);
                 });
                 novelDao.findByIdArray(id_list,function(err,docs){
                    var temp = []
                    for(var i = 0 ; i<docs.length;i++){
                        temp[i] = {
                              "_id" :docs[i]._id,
                              "novel_name" : docs[i].novel_name,
                              "novel_type" : docs[i].novel_type,
                              "novel_description" : docs[i].novel_description,
                              "novel_author" : docs[i].novel_author,
                              "novel_author_name" : docs[i].novel_author_name,
                              "novel_zan_num" : docs[i].novel_zan_num,
                              "novel_collection_num" : docs[i].novel_collection_num,
                              "novel_chapter_num" : docs[i].novel_chapter_num,
                              "novel_comment_num" : docs[i].novel_comment_num,
                              "novel_pic" : docs[i].novel_pic,
                              "novel_tags" : docs[i].novel_tags,
                              "collect_time":date_list[i],
                              "collect_id":record_id_list[i]
                        }
                        console.log('-----------------------------------');
                    }
                    res.json(temp);
                 });
            }
          });
     });

    //获取点赞记录
    app.get('/getZanRecord',function(req,res){
            console.log('getZanRecord');
              var user_id = req.query.user_id || req.session.user._id,
                  record_pageNum = parseInt(req.query.record_pageNum),
                  record_pageSize = parseInt(req.query.record_pageSize);
              zan_recordDao.findRecordById(user_id,function(err,docs){
                var start_p = (record_pageNum-1)*record_pageSize;
                var end_p = record_pageNum*record_pageSize;
                console.log(start_p +"mmmmmmmmmmmmm" +end_p)
                if(!err){
                     end_p = (end_p > docs.length)?(docs.length):(end_p);
                     var id_list = [],
                         date_list = [],
                         record_id_list = [];
                     docs.slice(start_p,end_p).map(function(v,i){
                        id_list.push(v.collect_record_novel_id);
                        date_list.push(v.collect_record_date);
                         record_id_list.push(v._id);
                     });
                     novelDao.findByIdArray(id_list,function(err,docs){
                         var temp = []
                        for(var i = 0 ; i<docs.length;i++){
                            temp[i] = {
                                  "_id" :docs[i]._id,
                                  "novel_name" : docs[i].novel_name,
                                  "novel_type" : docs[i].novel_type,
                                  "novel_description" : docs[i].novel_description,
                                  "novel_author" : docs[i].novel_author,
                                  "novel_author_name" : docs[i].novel_author_name,
                                  "novel_zan_num" : docs[i].novel_zan_num,
                                  "novel_collection_num" : docs[i].novel_collection_num,
                                  "novel_chapter_num" : docs[i].novel_chapter_num,
                                  "novel_comment_num" : docs[i].novel_comment_num,
                                  "novel_pic" : docs[i].novel_pic,
                                  "novel_tags" : docs[i].novel_tags,
                                  "collect_time":date_list[i],
                                  "collect_id":record_id_list[i]
                            }
                            console.log('-----------------------------------');
                        }
                        res.json(temp);
                     });
                }
              });
         });

     //获取阅读记录
    app.get('/getReadRecord',function(req,res){
      console.log('getReadRecord');
          var user_id = req.query.user_id || req.session.user._id,
              record_pageNum = parseInt(req.query.record_pageNum),
              record_pageSize = parseInt(req.query.record_pageSize);
          read_recordDao.findByUserId(user_id,function(err,docs){
            var start_p = (record_pageNum-1)*record_pageSize;
            var end_p = record_pageNum*record_pageSize;
            console.log(start_p +"mmmmmmmmmmmmm" +end_p)
            if(!err){
                 end_p = (end_p > docs.length)?(docs.length):(end_p);
                 var id_list = [],
                     date_list = [],
                     record_id_list = [];
                 docs.slice(start_p,end_p).map(function(v,i){
                    id_list.push(v.read_record_novel_id);
                    date_list.push(v.read_date);
                    record_id_list.push(v._id);
                 });
                 console.log(id_list);
                 novelDao.findByIdArray(id_list,function(err,docs){
                    var temp = []
                    for(var i = 0 ; i<docs.length;i++){
                        temp[i] = {
                              "_id" :docs[i]._id,
                              "novel_name" : docs[i].novel_name,
                              "novel_type" : docs[i].novel_type,
                              "novel_description" : docs[i].novel_description,
                              "novel_author" : docs[i].novel_author,
                              "novel_author_name" : docs[i].novel_author_name,
                              "novel_zan_num" : docs[i].novel_zan_num,
                              "novel_collection_num" : docs[i].novel_collection_num,
                              "novel_chapter_num" : docs[i].novel_chapter_num,
                              "novel_comment_num" : docs[i].novel_comment_num,
                              "novel_pic" : docs[i].novel_pic,
                              "novel_tags" : docs[i].novel_tags,
                              "collect_time":date_list[i],
                              "collect_id":record_id_list[i]
                        }
                        console.log('-----------------------------------');
                    }
                    res.json(temp);
                 });
            }
          });
    });

    //删除收藏记录
    app.get('/quitCollect',function(req,res){
        console.log('quitCollect');
        var _id = req.query._id;
        collect_recordDao.deleteRecord(_id,function(err,docs){
            if(!err){
                res.json({'info':'删除成功！'});
            }
        });
    });

    //删除点赞记录
    app.get('/quitZan',function(req,res){
        console.log('quitZan');
        var _id = req.query._id;
        zan_recordDao.deleteRecord(_id,function(err,docs){
            if(!err){
                res.json({'info':'删除成功！'});
            }
        });
    });

    //删除阅读记录
    app.get('/quitRead',function(req,res){
        console.log('quitRead');
        var _id = req.query._id;
        read_recordDao.deleteRecord(_id,function(err,docs){
            if(!err){
                res.json({'info':'删除成功！'});
            }
        });
    });

}

