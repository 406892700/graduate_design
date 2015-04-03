/**
 * Created by Administrator on 15-1-27.
 */

var novelDao = require('../dao/novelDao');
var chapterDao = require('../dao/chapterDao');
var zanDao = require('../dao/zanDao');
var collectDao = require('../dao/collectDao');
var readDao = require('../dao/readDao');

module.exports = function(app){
    app.get("/addNovel_page",function(req,res){
        res.render('novel/add_novel/addNovel',{'name':'dd','user':req.session.user});
    });

    app.post('/addNovel',function(req,res){
        var obj = req.body;
        
        console.log(obj.novel_name);
        
        //console.log("-------------------------------------------"+req.body.novel_pic);
        novelDao.save(obj,function(err){
           err?res.json('info','novel add faild!'):res.json('info','novel add successfully!');
        });
    });

    app.post('/search_novel',function(req,res){
        var param =  req.body.novel_name;
        console.log('novel name is '+param);
        novelDao.findByName(param,function(err,docs){
            res.render('search_result/result',{'res':docs,'user':req.session.user});//把数据库获取的数据直接返回给前台
        });
    });

    app.get('/novel_detail',function(req,res){
        var id = req.query._id;
        //console.log(id);
        console.log("++++++++"+req.session.user.pic);
        novelDao.findById(id,function(err,docs){
            res.render('novel/chapter_detail/chapter',{'res':docs[0],'user':req.session.user});//肯定只有一个
        });
    });

    //根据作者来找小说
    app.get('/getNovel_by_user',function(req,res){
        var _user_id = req.session.user._id;
        novelDao.findByUserId(_user_id,function(err,docs){
            res.json(docs);
        });
    });

    var  fs = require('fs');

    //小说封面上传
    app.post('/upload_image',function(req,res){
          for(var i in req.files){
            if(req.files[i].size == 0){
                fs.fs.unlinkSync(req.files[i].path);
                console.log('删了一个空的文件');
            }else{
                var target_path = 'public/pic/novel_pic/'+req.files[i].name;
                console.log(req.files[i].path);
                var readStream=fs.createReadStream(req.files[i].path);
                var writeStream=fs.createWriteStream(target_path);
                readStream.pipe(writeStream);
                readStream.on('end',function(){
                    fs.unlinkSync(req.files[i].path);
                 });

                console.log('重命名了一个文件');
            }
          }
          res.json('info','success!');

    });


    //添加&更新阅读记录
    app.get('/addReadRecord',function(req,res){
        var novel_id = req.query.novel_id,
            user_id = req.query.user_id || req.session.user._id;
        console.log("novel_id   "+novel_id);
        console.log("user_id   "+user_id);
        var obj = {'read_record_novel_id':novel_id,'read_record_from_id':user_id};
        readDao.ifExist(obj,function(err,docs){
            if(err){
                res.json('数据获取错误！');
                return;
            }
            if(docs.length > 0){
                readDao.updateDate(obj,function(err,docs){
                    res.json('info','阅读记录已更新');
                });
            }else{
                obj.read_date = new Date();
                readDao.save(obj,function(err,docs){
                    if(!err)
                        res.json({'info':'添加成功'});
                });
            }
        });
        
    });


    //小说赞
    app.get('/zan_novel',function(req,res){
        var novel_id = req.query.novel_id,
        user_id = req.query.user_id;
        console.log("novel_id   "+novel_id);
        console.log("user_id   "+user_id);
        novelDao.updateZan(novel_id,1,function(err,docs){
            if(!err){
                zanDao.save({'collect_record_novel_id':novel_id,'collect_record_user_id':user_id,'collect_record_date':new Date()},function(err,docs){
                    if(err){
                         console.log('插入赞记录时候出错');
                    }
                    else{
                    novelDao.findById(novel_id,function(err,docs){
                        console.log(docs[0]);
                        res.json({'current_num':docs[0].novel_zan_num});
                    });
                    
                }
            });
            }
        });
    });


    //小说收藏
    app.get('/collect_novel',function(req,res){
        var novel_id = req.query.novel_id,
        user_id = req.query.user_id;
        novelDao.updateCollect(novel_id,1,function(err,docs){
            if(!err){
                collectDao.save({'collect_record_novel_id':novel_id,'collect_record_user_id':user_id,'collect_record_date':new Date()},function(err,docs){
                    //console.log(docs);
                    if(err){
                        console.log('插入收藏记录时候出错');
                    }
                    else{
                        novelDao.findById(novel_id,function(err,docs){
                            console.log(docs[0]);
                            res.json({'current_num':docs[0].novel_collection_num});
                        });
                        
                    }
                       
            });
            }
        });
    });


    //是否可赞

    app.get('/if_zan',function(req,res){
        var novel_id = req.query.novel_id,
        user_id = req.query.user_id;
        zanDao.ifExist({'novel_id':novel_id,'user_id':user_id},function(err,docs){
            if(err){
                console.log('获取是否存在出错！');
            }
            else{
                docs.length?res.json({'flag':false}):res.json({'flag':true});
            }
                
        });
    });

    //是否可以收藏
    app.get('/if_collect',function(req,res){
        var novel_id = req.query.novel_id,
        user_id = req.query.user_id;
        collectDao.ifExist({'novel_id':novel_id,'user_id':user_id},function(err,docs){
            if(err){
                console.log('获取是否存在出错！');
            }
            else{
                docs.length?res.json({'flag':false}):res.json({'flag':true});
            }
                
        });
    });

}
