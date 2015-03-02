/**
 * Created by Administrator on 15-2-27.
 */
var novelDao = require('../dao/novelDao');
var chapterDao = require('../dao/chapterDao');

module.exports = function(app){
    app.get('/add_chapter_page',function(req,res){
        res.render('chapter/add_chapter',{'title':'添加章节'})
    });
    app.post('/add_chapter',function(req,res){
        var obj = req.body;
        var novel_id = obj.chapter_novel;
        chapterDao.findByNovel(novel_id,function(err,docs){
            var index = docs.length+1;
            console.log(index);
            obj.chapter_index = index;
            chapterDao.save(obj,function(err){
                err?res.json('info','chapter add faild!'):res.json('info','chapter add successfully!');
            });
        });

    });

    app.get('/get_chapters',function(req,res){
        var id = req.query._id;
        chapterDao.findByNovel(id,function(err,docs){
            res.json(docs);
        });
    });

    app.get('/read_chapter_page',function(req,res){
        res.render('chapter/read_chapter/page.html',{});
    });

    app.get('/go_to_read',function(req,res){
        var obj = req.query;
        chapterDao.findByIndex_novel(obj,function(err,docs){
            console.log("++++++++++++++++++++++++++"+docs);
            res.render("chapter/read_chapter/page",{'res':docs[0]});
        });
    });
}