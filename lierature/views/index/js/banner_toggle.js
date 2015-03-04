 //首焦的自动切换
 ;(function(global,$){
    $.fn.banner_toggle = function(config){
        var that = this;//全局插件指向的对象
        // alert('dd'+that.html());
        var ctr_obj = $('.banner_ctrl',that);//切换控制器
        var default_config = {'freq':'5s','scale_rate':'1.05'};//默认配置参数
        var config = $.extend({},default_config,config);//合并配置参数

        var scale_init = function(obj){//初始化形变函数
            obj.bind('mouseover',function(e){
                $('img',obj).css({'transform':'scale('+config.scale_rate+')','transition':'transform '+config.freq+' linear'});
                //alert('transform'+'scale('+config.scale_rate+')'+'transition'+'transform '+config.freq+' linear')
            });
            obj.trigger('mouseover');
        };

        var reset_scale_init = function(obj){//清除形变函数
             $('img',obj).css({'transform':'scale(1)'});
             //alert(obj.html());
        };

        
        var init = function(){
            reset_scale_init($('.show',that));
            scale_init($('.banner_idt',that).eq(0));
            ctr_obj.children('a').bind('click',function(e){
                $('.current',ctr_obj).removeClass('current');//控制器
                reset_scale_init($('.show',that));
                $('.show',that).removeClass('show').fadeOut();
                
                $(this).addClass('current');
                $('.banner_idt',that).eq($(this).index()).addClass('show').fadeIn();
                $('.index_banner').css({'background-color': $('.banner_idt',that).eq($(this).index()).data('color')});
                scale_init($('.banner_idt',that).eq($(this).index()));
            });

            var auto_toggle = function(){//自动切换函数
                var now_tab_index = $('.current',ctr_obj).index();
                var length = ctr_obj.children("a").length;
                console.log(length+","+now_tab_index)
                if(now_tab_index == length-1){
                    now_tab_index = 0;
                    console.log('fuck');
                }else{
                    now_tab_index++;
                    console.log('you');
                }
                ctr_obj.children('a').eq(now_tab_index).trigger('click');  
        };

            setInterval(auto_toggle,4000);
        };

        return  this.each(function(){
            init();
        });

    }
})(window,$);