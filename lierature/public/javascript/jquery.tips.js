;(function(global,$,undefined){
//------------------------配置插件------------------------------------------
	var default_config = {//弹窗默认配置
		width:'400px',//宽
		height:'300px',//高
		mask:true,//遮罩层
		dnd:false,//是否可拖放
		position:'center'//弹窗位置
	},template = ['<div class="tips">','<span class="close">','</span>','<div class="content">','</div>',
	'<div class="button_pl"><a class="btn_done" onclick="$(\'.close\').trigger(\'click\')">确定</a><a class="btn_dismiss" onclick="$(\'.close\').trigger(\'click\')">取消</a></div>',
	'</div>'].join('\n'),//弹窗框架
	mask_template = ['<div style="width:100%;height:100%;position:fixed;z-index:1024;background-color:rgba(0,0,0,0.3);margin:0px;display:none;">','</div>'].join("\n"),
	global_config = {},//全局配置对象
	tips_obj = $(template),//弹窗对象
	mask_obj = $(mask_template);//

	var _tips_init = function(content,config){//弹窗初始化
		content = content || "";
		//alert(tips_obj.html());
		$(document.body).prepend(mask_obj).prepend(tips_obj);
		tips_obj.resize(config.width,config.height);//大小
		$('.close').bind('click',
			function(){
				tips_obj.hide('slideUp');
			});
		return tips_obj;
	};

	tips_obj.resize = function(width,height){//重置大小

		this.css({'width':width,'height':height});
		//alert(width+","+height);
		return this;
	};

	tips_obj.show = function(effect,position){//显示弹窗
		effect = effect || 'fadeIn';
		eval("this."+effect+"('0.5s')");
		mask_obj.show();
		this.position(position);
		return this;
	};

	tips_obj.position = function(position){//弹窗位置
		position = position || 'center';
		(typeof position == 'string')?
		(this.css({'left':'50%','top':'50%','margin-left':-this.width()/2,'margin-top':-this.height()/2})):
		(this.css({'top':position.top,'left':position.left}));
	}

	tips_obj.hide = function(effect){//隐藏弹窗
		effect = effect || 'fadeOut';
		eval("this."+effect+"('0.5s')");
		mask_obj.hide();
		return this;
	};

	tips_obj.setText = function(content){//设置文字
		tips_obj.children('.content').html(content);
		$('.button_pl').show();
		return this;
	}

	// tips_obj.delete = function(){//删除弹窗
	// 	this = null;
	// 	return undefined;
	// }

	var append_to_tips = function(data){//添加数据
		//alert(data);
		$('.button_pl').hide();
		tips_obj.children('.content').html('').append(data);
	};

	var getData = function(url,callback){//获取弹窗内要显示的内容
		$.ajax({
			url:url,
			success:function(data){
				callback(data);
			},
			error:function(data){
				alert('数据获取错误！');
			}
		});
	};

	$.tips = function(url,config){//插件入口函数，返回一个弹窗对象
		if(url){
			getData(url,append_to_tips);
		}else{
			//throw 'url is invalid';
		
		config = config || {};
		global_config = $.extend({},default_config,config);
		}
		return _tips_init(url,global_config);
	}

})(window,$,undefined);