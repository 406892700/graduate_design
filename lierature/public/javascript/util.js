/**
 * Created by Administrator on 15-1-29.
 */

;(function(global,$){
	$.fn.count_word = function(){
        var that = this;
        var init = function(){
            that.bind('keyup',function(e){
                var $word_num = that.parent().find('.word_num');
                $word_num.text($(this).val().length);
            });
        }

        return this.each(function(){
            init();
        });
    }


    Date.format = function(date){
        if(!date)
            return;
        date = (typeof date == 'object')?(date):(new Date(date));

        var dateList = [date.getFullYear(),'-',date.getMonth()+1,'-',date.getDate(),' ',date.getHours(),':',new String(date.getMinutes()).length == 2?date.getMinutes():"0"+date.getMinutes()];

        return dateList.join("");
        };

    $.fn.tag_factory = function(name){
        var that = this;
        var $input = this.find('input[type="text"]'),
            $btn = this.find('a.tag_btn'),
            $list = this.find('.tag_list'),
            $tag_idt = $('<a href="javascript:void(0)"></a>'),
            $tag_info = this.find('div.tag_info');

            var util = {
                validate_val:function(str){
                    return /^[^x00-xff]{2,6}$/.test(str);
                },
                show_tips:function(str){
                    $tag_info.text(str);
                },
                set_value:function(){
                    var tagsx = [];
                    $list.find('a').each(function(i,v,x){
                        tagsx.push($(this).text());
                    });

                    console.log(tagsx);
                    $('input[name="'+name+'"]').val(tagsx);
                }
            };

            var init = function(){
                $btn.bind('click',function(e){
                    var tag_value = $input.val();
                    if(!util.validate_val(tag_value)){
                        util.show_tips('您输入的标签格式有误~！');
                        return ;
                    }
                    if($list.find('a').length >= 3){
                        util.show_tips('标签最多为3个');
                        return;
                    }

                    $list.append('<a href="javascript:void(0)">'+tag_value+'</a>');
                    util.set_value();
                });

                $list.on('click','a',function(e){
                    $(this).fadeOut('1s',$(this).remove());
                    util.set_value();
                });
            }

            return this.each(function(){
                init();
            });
    };

})(window,$)