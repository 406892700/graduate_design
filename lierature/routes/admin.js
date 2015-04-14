/**
 * Created by Administrator on 15-2-27.
 */
var adminDao = require('../dao/adminDao');
var applyDao = require('../dao/applyDao');

module.exports = function(app){

    app.get('/lookCollectRecord',function(req,res){
        console.log('去看收藏记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });

    app.post('/admin_login_now',function(req,res){
      console.log('去后台');
      var obj  = req.body;
      adminDao.login(obj,function(err,docs){
        if(err)
          res.json('info','出错了！');
        else if(docs.length == 0){
          res.json('info','账号或密码错误！')
        }
        else{
          req.session.admin = docs[0];
          res.redirect('/admin');
        }
      });
    });


    //添加作者申请
    app.post('/add_new_apply',function(req,res){
      console.log('添加一条作者申请记录');
      var user = req.session.user;
      var obj = req.body;
      obj.Apply_record_author = user.username;
      obj.Apply_record_author_id = user._id;
      obj.Apply_record_date = new Date();
      obj.Apply_record_status = '1';
      applyDao.save(obj,function(err,docs){
        if(err){
          console.log('info','出错了！');
          return;
        }
        res.json('info','添加成功！');
      });
    });

   //获取所有的作者申请记录
    app.get('/get_apply_record',function(req,res){
      console.log('获取所有的作者申请记录');
      var obj = req.query;
      var pageSize = obj.pageSize,
          currentPage = obj.currentPage;
      applyDao.findById(undefined,function(err,docs){
        if(err){
           res.json('info','出错了');
           return;
        }
        var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
        // res.json(temp);

      });
    });
   

}

