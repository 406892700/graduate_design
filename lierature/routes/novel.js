/**
 * Created by Administrator on 15-1-27.
 */

var novelDao = require('../dao/novelDao');

module.exports = function(app){
    app.get("/addNovel_page",function(req,res){
        res.render('addNovel',{'name':"请添加小说"});
    });

    app.post('/addNovel',function(req,res){
        var novel_name = req.body.novel_name;
        var novel_author = req.body.novel_author;
        console.log(novel_name+"   "+novel_author);
        var obj = {'novel_name':novel_name,'novel_author':novel_author};
        novelDao.save(obj,function(err){
            err?res.json('info','novel add faild!'):res.json('info','novel add successfully!');
        });
    });
}
