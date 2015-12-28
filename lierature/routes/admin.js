/**
 * Created by Administrator on 15-2-27.
 */
var adminDao = require('../dao/adminDao');
var applyDao = require('../dao/applyDao');
var applyNovelDao = require('../dao/applyNovelDao');
var novelDao = require('../dao/novelDao');
var adDao  = require('../dao/adDao');
var typeDao = require('../dao/typeDao');
var userDao = require('../dao/userDao');
//var recommendDao = require('../dao/recommendDao');

module.exports = function(app){
  //查看收藏记录
    app.get('/lookCollectRecord',function(req,res){
        console.log('去看收藏记录!');
        if(!req.session.user)
            res.render('login/login1',{'title':"登录",'user':req.session.user});
        var tab = req.query.tab;
        res.render('reader_center/reader_center',{'title':'作者个人中心','user':req.session.user});
    });
//跳转后台页面
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


  //获取所有未审核的作品
  app.get('/get_apply_novel',function(req,res){
    console.log('获取所有的未审核的作品');
    var obj = req.query;
    var pageSize = obj.pageSize,
        currentPage = obj.currentPage;
        novelDao.findByIdAndNotPass(undefined,function(err,docs){
          if(err){
            res.json('info','出错了');
            return;
          }
          var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','currentPage':currentPage,'content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
        });
  });

   //获取所有的作者申请记录
    app.get('/get_apply_record',function(req,res){
      console.log('获取所有的作者申请记录');
      var obj = req.query;
      var pageSize = obj.pageSize,
          currentPage = obj.currentPage;
      applyDao.findByIdWithoutCheck('1',function(err,docs){
        if(err){
           res.json('info','出错了');
           return;
        }
        var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','currentPage':currentPage,'content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
        // res.json(temp);

      });
    });


    //获取小说申请正文
    app.get('/get_novel_content',function(req,res){
      console.log('获取小说申请正文');
      var _id = req.query._id;
      console.log(_id);
      novelDao.findById(_id,function(err,docs){
        if(err){
          res.json('info','出错了！');
          return ;
        }
        else{
          console.log(docs);
          res.json({'content':docs[0].novel_content});
        }
      });
    });


    //获取作者申请正文
    app.get('/get_apply_content',function(req,res){
      console.log('获取作者申请正文');
      var _id = req.query._id;
      console.log(_id);
      applyDao.findById(_id,function(err,docs){
        if(err){
          res.json('info','出错了！');
          return ;
        }
        else{
          res.json({'content':docs[0].Apply_record_content});
        }
      });
    });


    //作者审核通过/不通过
    app.get('/change_author_apply_status',function(req,res){
      var _id = req.query._id.split(',');
      var status = req.query.status;
      applyDao.updateStatus(_id,status,function(err,docs){
        if(err){
          res.json('info','出错了！');
          return;
        }
        else{
          //useDao.updateStatus({})
          applyDao.findApply({'_id':{'$in':_id}},function(err,docs){
            var temp = [];
            for(var i =0 ;i<docs.length;i++){
              temp.push(docs[i].Apply_record_author_id);
            }
            userDao.updateStatus({'_id':{'$in':temp}},{'user_type':'author'},function(err){
              if(err){
                res.json('info','出错了！');
                return;
              }else{
                res.json({'code':1,'content':'操作成功！'});
              }
            });
          });
        //   if(status == '3')
        //     res.json({'code':'1','content':'操作成功！'});
        //   else
        //     res.json({'code':'2','content':'操作成功！'});
         }
      });
    });


    //新作品审核通过/不通过
    app.get('/change_novel_apply_status',function(req,res){
      var _id = req.query._id.split(',');
      var status = req.query.status;
      novelDao.updateStatus(_id,status,function(err,docs){
        if(err){
          res.json('info','出错了！');
          return;
        }
        else{
          if(status == '3')
            res.json({'code':'1','content':'操作成功！'});
          else
            res.json({'code':'2','content':'操作成功！'});
        }
      });
    });


    //获取首焦
   app.get('/get_ads',function(req,res){
    console.log('获取首焦');
     var obj = req.query;
      var pageSize = obj.pageSize,
          currentPage = obj.currentPage;
    adDao.findAds({},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }
      else{
         var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','currentPage':currentPage,'content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
      }
    });
   });


   //获取单个首焦
   app.get('/get_ad_by_id',function(req,res){
    console.log('获取单个首焦！');
    var _id = req.query._id;
    adDao.findAds({'_id':_id},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }
      else{
        
        var temp = new Date(docs[0].end_time);
        console.log(typeof temp);
        var year = temp.getFullYear();
        var month = ""+(temp.getMonth()+1);
        var day = ""+temp.getDate();
        console.log('month.length='+month.length+",day.length="+day.length);
        month = month.length == 1?"0"+month:month;
        day = day.length == 1?"0"+day:day;
        docs[0].end_time = year+"-"+month+'-'+day;
        console.log(docs[0]);
        res.json(docs[0]);
      }
    });
   });


    //获取分类
   app.get('/get_types',function(req,res){
    console.log('获取分类');
     var obj = req.query;
      var pageSize = obj.pageSize,
          currentPage = obj.currentPage;
    typeDao.findType({},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }
      else{
         var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','currentPage':currentPage,'content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
      }
    });
   });

   //获取一个分类
   app.get('/get_type_by_id',function(req,res){
     var _id = req.query._id;
      typeDao.findType({'_id':_id},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }
      else{
        var temp = new Date(docs[0].end_time);
        console.log(typeof temp);
        var year = temp.getFullYear();
        var month = ""+(temp.getMonth()+1);
        var day = ""+temp.getDate();
        console.log('month.length='+month.length+",day.length="+day.length);
        month = month.length == 1?"0"+month:month;
        day = day.length == 1?"0"+day:day;
        docs[0].end_time = year+"-"+month+'-'+day;
        console.log(docs[0]);
        res.json(docs[0]);
      }
    });
   });


//编辑分类
   app.post('/update_type',function(req,res){
     //var obj = req.body.data;//获取到所有数据
      var _id = "",temp = {};
      for(var i in req.body){
        //console.log(req.body[i]);
        if(i == "data._id"){
          _id = req.body[i];
        }else{
           var x = i.substring(5);
           temp[""+x+""] = req.body[i];
        }
      }
      console.log(_id);
      console.log(temp);

      typeDao.updateType({'_id':_id},temp,function(err,docs){
        if(err){
          res.json({'code':1,'content':'出错了！'});
          return;
        }else{
          res.json({'code':2,'content':'修改成功！'});
        }
      });
   });



   //添加新首焦
   app.post('/add_ad',function(req,res){
    var obj = req.body.data;
    console.log(req.body);
    var temp = {};
    for(var i in req.body){
      console.log(req.body[i]);
      var x = i.substring(5);
      temp[""+x+""] = req.body[i];
    }
    console.log(temp);
    adDao.save(temp,function(err,docs){
      if(err){
        res.json({'code':1,'content':'出错了！'});
        return;
      }else{
        res.json({'code':2,'content':'保存成功！'});
      }
    });
   });


   //更新首焦
   app.post('/update_ad',function(req,res){
    //var obj = req.body.data;//获取到所有数据
    var _id = "",temp = {};
    for(var i in req.body){
      //console.log(req.body[i]);
      if(i == "data._id"){
        _id = req.body[i];
      }else{
         var x = i.substring(5);
         temp[""+x+""] = req.body[i];
      }
    }
    console.log(_id);
    console.log(temp);

    adDao.updateAd({'_id':_id},temp,function(err,docs){
      if(err){
        res.json({'code':1,'content':'出错了！'});
        return;
      }else{
        res.json({'code':2,'content':'修改成功！'});
      }
    });
   });

//删除首焦
   app.get('/delete_ad',function(req,res){
    var _id = req.query._id;//保存静态快照
    //delete obj._id;//删除_id
    adDao.removeAd({'_id':_id},function(err,docs){
      if(err){
        res.json({'code':1,'content':'出错了！'});
        return;
      }else{
        res.json({'code':2,'content':'删除成功！'});
      }
    });
   });


   //获取推荐
   app.get('/get_recommends',function(req,res){
    console.log('获取推荐');
     var obj = req.query;
      var pageSize = obj.pageSize,
          currentPage = obj.currentPage;
   novelDao.findRecommend({'novel_recommend':'2'},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }
      else{
         var temp = Array.prototype.slice.call(docs,(currentPage-1)*pageSize,currentPage*pageSize);//截取当前页的记录

        temp.length?res.json({'code':'1','currentPage':currentPage,'content':temp}):res.json({'code':'2','content':'没有更多记录了~'});//若有记录则返回当页记录,否则返回没有更多记录
      }
    });
   });


//-------------------------------奇葩的问题------------------------------------------

   //添加新推荐
   app.get('/add_recommend',function(req,res){
    console.log('添加新推荐！');
    var _id = req.query._id;//获取_id
    console.log(_id);
    novelDao.updateNovel({'_id':_id},{'novel_recommend':'2'},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }else{
        res.json('info','操作成功！');
      }
    });
   });


   //删除推荐
   app.get('/delete_recommend',function(req,res){
    console.log('删除推荐!');
    var _id = req.query._id;//获取_id
    console.log(_id);
    novelDao.updateNovel({'_id':_id},{'novel_recommend':'1'},function(err,docs){
      if(err){
        res.json('info','出错了！');
        return;
      }else{
        res.json('info','操作成功！');
      }
    });
   });

}

