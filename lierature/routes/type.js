/**
 * Created by Administrator on 15-1-27.
 */

var typeDao = require('../dao/typeDao');
var novelDao = require('../dao/novelDao');

module.exports =  function(app){
	//去分类页面
    app.get('/go_to_type',function(req,res){
    	var type_name = req.query._type_name;//获取类别名字
    	typeDao.findType({'novel_type_name':type_name},function(err,docs){
    		var type_docs = docs[0];
    		novelDao.getAllNovel({'novel_type':type_name,'novel_status':'2'},function(err,docs){
    			var novel_docs  = docs;
    			res.render('novel_type/novel_type',{'user':req.session.user,'res':novel_docs,'type':type_docs});
    		});
    	});
    });

    var fs= require('fs');  

    app.get('/read_mgc',function(req,res){

        fs.readFile('g://bishe/lierature/lierature/public/pic/mgc.txt','utf-8',function(err,data){  
            if(err){  
                console.log(err);  
            }else{  
                console.log(data);    
            }  
        });  
    });
}