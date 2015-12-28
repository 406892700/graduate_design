var admin_modal = (function(global,$){
	var modal_ad = function(_id){
		var tpl = [];
			tpl.push("<script type=\"text/javascript\">\n");
			tpl.push("$(function(){\n");
			tpl.push("$('.button_pl').hide();\n");
		if(_id){
			tpl.push("$.ajax({\n");
			tpl.push("url:'/get_ad_by_id?_id="+_id+"',\n");
			tpl.push("success:function(data){\n");
			tpl.push("$('.fake_text').text(data.pic);");
			tpl.push("$('#main_form1').fill(data);\n");
			tpl.push("},error:function(err){\n");
			tpl.push("alert('数据获取错误！');\n");
			tpl.push("}\n");
			tpl.push("})\n");
		}
			tpl.push("\n");
			tpl.push("});\n");
			tpl.push("</script>\n");
		
		
		tpl.push("<div class=\"main_content\">\n");
		if(_id){
			tpl.push("<form action=\"/update_ad\" class=\"main_form\" id=\"main_form1\" method=\"post\">\n");
			tpl.push("<input type='hidden' name='data._id'>")
		}else{
			tpl.push("<form action=\"/add_ad\" class=\"main_form\" id=\"main_form1\" method=\"post\">\n");
		}
		
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>首焦图片</label></div>\n");
		tpl.push("<div class=\"form_cpt\" style=\"position:relative;\">\n");
		tpl.push("<input type=\"file\"  id=\"input\" style=\"opacity:0;\">\n");
		tpl.push("<div class=\"upload_instead\" onclick=\"$('#input').trigger('click');\">\n");
		tpl.push("<div class=\"fake_btn\">上传图片</div>\n");
		tpl.push("<div class=\"fake_text\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("<script type=\"text/javascript\">\n");
		tpl.push("$('#input').bind('change',function(){\n");
		tpl.push("$('.fake_text',$(this).parent()).text($(this).val());\n");
		tpl.push("var pic_name = $('.fake_text').text().split('\\\\');\n");
		tpl.push("$(\"input[name='data.pic']\").val(\"/pic/novel_pic/\"+pic_name[pic_name.length-1]);\n");
		tpl.push("});\n");
		tpl.push("</script>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>主色值</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.color\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>广告链接</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.link\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>结束时间</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"date\" name=\"data.end_time\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>序号</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.index\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<input type=\"hidden\" name=\"data.pic\">\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\" style=\"border:none;\">\n");
		tpl.push("<div class=\"form_label\"></div>\n");
		tpl.push("<div class=\"form_cpt\"><button type=\"submit\" class=\"form_submit\">确认提交</button></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("\n");
		tpl.push("</form>\n");
		tpl.push("</div><!--main_content-->\n");
		tpl.push("\n");
		tpl.push("\n");
		return tpl.join('');
	};


var modal_type = function(_id){
	var tpl = [];
			tpl.push("<script type=\"text/javascript\">\n");
			tpl.push("$(function(){\n");
		if(_id){
			tpl.push("$('.button_pl').hide();\n");
			tpl.push("$.ajax({\n");
			tpl.push("url:'/get_type_by_id?_id="+_id+"',\n");
			tpl.push("success:function(data){\n");
			tpl.push("$('#pic1').text(data.novel_type_pic);\n");
			tpl.push("$('#pic2').text(data.novel_type_bg_pic);\n");
			tpl.push("$('#main_form2').fill(data);\n");
			tpl.push("},error:function(err){\n");
			tpl.push("alert('数据获取错误！');\n");
			tpl.push("}\n");
			tpl.push("})\n");
			tpl.push("\n");
		}
			tpl.push("});\n");
			tpl.push("</script>\n");
		
		tpl.push("<div class=\"main_content\">\n");
		tpl.push("<form action=\"/update_type\" class=\"main_form\" id=\"main_form2\" method=\"post\">\n");
		if(_id){
			tpl.push("<input type='hidden' name='data._id'>")
		}
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>类别名称</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.novel_type_name\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>类别图标</label></div>\n");
		tpl.push("<div class=\"form_cpt\" style=\"position:relative;\">\n");
		tpl.push("<input type=\"file\"  id=\"input\" style=\"opacity:0;\">\n");
		tpl.push("<div class=\"upload_instead\" onclick=\"$('#input').trigger('click');\">\n");
		tpl.push("<div class=\"fake_btn\" id='f_btn1'>上传图片</div>\n");
		tpl.push("<div id='pic1' class=\"fake_text\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>类别背景色</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.novel_type_bg\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>类别背景</label></div>\n");
		tpl.push("<div class=\"form_cpt\" style=\"position:relative;\">\n");
		tpl.push("<input type=\"file\" id=\"input1\" style=\"opacity:0;\">\n");
		tpl.push("<div class=\"upload_instead\" onclick=\"$('#input1').trigger('click');\">\n");
		tpl.push("<div class=\"fake_btn\" id='f_btn1'>上传图片</div>\n");
		tpl.push("<div id='pic2' class=\"fake_text\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("</div>\n");
		tpl.push("<script type=\"text/javascript\">\n");
		tpl.push("$('#input').bind('change',function(){\n");
		tpl.push("$('.fake_text',$(this).parent()).text($(this).val());\n");
		tpl.push("var pic_name = $('.fake_text',$(this).parent()).text().split('\\\\');\n");
		tpl.push("$(\"input[name='data.novel_type_pic']\").val(\"/pic/novel_pic/\"+pic_name[pic_name.length-1]);\n");
		tpl.push("});\n");
		tpl.push("$('#input1').bind('change',function(){\n");
		tpl.push("$('.fake_text',$(this).parent()).text($(this).val());\n");
		tpl.push("var pic_name = $('.fake_text',$(this).parent()).text().split('\\\\');\n");
		tpl.push("$(\"input[name='data.novel_type_bg_pic']\").val(\"/pic/novel_pic/\"+pic_name[pic_name.length-1]);\n");
		tpl.push("});\n");
		tpl.push("</script>\n");
		tpl.push("\n");
		tpl.push("\n");
		tpl.push("\n");
		tpl.push("<div class=\"form_item\">\n");
		tpl.push("<div class=\"form_label\"><label>类别描述</label></div>\n");
		tpl.push("<div class=\"form_cpt\"><input type=\"text\" name=\"data.novel_type_description\"></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("<input type=\"hidden\" name=\"data.novel_type_pic\">\n");
		tpl.push("<input type=\"hidden\" name=\"data.novel_type_bg_pic\">\n");
		tpl.push("<div class=\"form_item\" style=\"border:none;\">\n");
		tpl.push("<div class=\"form_label\"></div>\n");
		tpl.push("<div class=\"form_cpt\"><button type=\"submit\" class=\"form_submit\">确认修改</button></div>\n");
		tpl.push("<div class=\"c_fix\"></div>\n");
		tpl.push("</div>\n");
		tpl.push("\n");
		tpl.push("</form>\n");
		tpl.push("</div><!--main_content-->\n");
		tpl.push("\n");
		tpl.push("\n");
		tpl.push("\n");
		return tpl.join('');
	};


	return {
		modal_ad:modal_ad,
		modal_type:modal_type
	};
	
})(window,$);
