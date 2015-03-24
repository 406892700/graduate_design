/**
 * Created by Administrator on 15-2-27.
 */

var commentDao = require('../dao/commentDao');

module.exports = function(app){
    app.post('/add_comment',function(req,res){
        var obj = req.body;
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
}