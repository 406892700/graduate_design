/**
 * Created by Administrator on 15-2-27.
 */

var commentDao = require('../dao/commentDao');

module.exports = function(app){
    app.post('/add_comment',function(req,res){
        var obj = req.body;
        if(!req.session.user){
             res.redirect('/login?return_url='+req.session.prev_url);
             return;
        }
           
        var user = req.session.user;//从session中读取数据
        obj.comment_author = user._id;
        obj.comment_author_name = user.username;
        obj.comment_author_pic = user.pic;
        obj.comment_date = new Date();

        console.log(obj);
        commentDao.save(obj,function(err){
            err?res.json('info','comment add faild!'):res.json('info','comment add successfully!');
        });
    });

    app.get('/get_comments',function(req,res){
        var id = req.query._id;
        commentDao.findByNovel(id,function(err,docs){
            res.json(docs);
        }); 
    });

    app.get('/quit_comment',function(req,res){
        var id = req.query._id;
        commentDao.removeComment({'_id':id},function(err,docs){
            res.json('操作成功！');
        });
    });
}