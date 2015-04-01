/**
 * Created by Administrator on 15-2-27.
 */
var collect_recordDao = require('../dao/collectDao');
var zan_recordDao = require('../dao/zanDao');
var novelDao = require('../dao/novelDao');

module.exports = function(app){
    app.get('/lookCollectRecord',function(req,res){
        console.log('去看收藏记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });

    app.get('/lookZanRecord',function(req,res){
        console.log('去看点赞记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });


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
                 var id_list = [];
                 var date_list = []
                // console.log(docs.slice(start_p,end_p));
                 docs.slice(start_p,end_p).map(function(v,i){
                    //console.log(v.collect_record_novel_id);
                    id_list.push(v.collect_record_novel_id);
                    date_list.push(v.collect_record_date);
                 });
                 // id_list.map(function(v){
                 //    console.log(v.collect_record_novel_id);
                 // })
                 novelDao.findByIdArray(id_list,function(err,docs){
                    // docs.map(function(v,i){
                    //     //docs[i].collect_time = date_list[i];
                    //     docs[i].prototype = {'collect_time':date_list[i]};
                    // });
                    // docs;
                    // docs[0]._v = date_list[0];
                    // for(var x in docs[0]){
                    //     console.log(x);
                    // }

                    // //docs[0]['novel_name'] = 'asdfasdf';
                    // console.log(docs[0].toString());
                    // console.log("地方刷机大师"+Object.getOwnPropertyNames(docs[0]));
                    // console.log(Object.getOwnPropertyDescriptor(docs[0],'novel_name'));
                    // console.log(Object.getOwnPropertyDescriptor(docs[0],'collect_time'));
                    res.json(docs);
                 });
                 //res.json(docs.slice(start_p,end_p));
            }
          });
     });

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
                 var id_list = [];
                 var date_list = []
                 docs.slice(start_p,end_p).map(function(v,i){
                    id_list.push(v.collect_record_novel_id);
                    date_list.push(v.collect_record_date);
                 });
                 novelDao.findByIdArray(id_list,function(err,docs){
                    res.json(docs);
                 });
            }
          });
     });
}

