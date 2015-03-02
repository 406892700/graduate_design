/**
 * Created by Administrator on 15-1-27.
 */

var novelDao = require('../dao/novelDao');
var chapterDao = require('../dao/chapterDao');

module.exports = function(app){
    app.get("/addNovel_page",function(req,res){
        res.render('novel/addNovel',{'name':"请添加小说"});
    });

    app.post('/addNovel',function(req,res){
        var obj = req.body;
        console.log("-------------------------------------------"+req.body.novel_pic);
        novelDao.save(obj,function(err){
           err?res.json('info','novel add faild!'):res.json('info','novel add successfully!');
        });
    });
    app.post('/search_novel',function(req,res){
        var param =  req.body.novel_name;
        console.log('novel name is '+param);
        novelDao.findByName(param,function(err,docs){
            res.render('search_result/result',{'res':docs});//把数据库获取的数据直接返回给前台
        });
    });

    app.get('/novel_detail',function(req,res){
        var id = req.query._id;
        console.log(id);
        novelDao.findById(id,function(err,docs){
            res.render('novel/chapter_detail/chapter',{'res':docs[0]});//肯定只有一个
        });

    });

}
