/**
 * Created by Administrator on 15-1-27.
 */

var novelDao = require('../dao/novelDao');
var chapterDao = require('../dao/chapterDao');

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

}
