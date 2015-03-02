;$(function(){
      var get_new_page = function(config){
        $('.mask').show();//遮罩层，用于显示滚动条

          $.ajax({        //ajax请求一个新章节
          url:'/chapter/read_chapter/new_page.html',
          success:function(data){
            $('.mask').hide();
            $('.read_area').append(data).fadeIn('slow');
            $('.page').page();
          },
          error:function(data){
            alert('error!');
          }
        });
        
      }
      $.fn.page = function(config){
        var evt_obj = $(this);//获取全局文章对象
        evt_obj.fadeIn('0.5s');//fadeIn效果
         $(document).on('contextmenu',function(evt){
          return false;
        });
        var left = evt_obj.css('left');//保存文章初始位置的静态快照（带px）
        var originl_offsetX = parseInt(evt_obj.css('left').slice(0,-4));//保存文章初始位置的静态快照（不带px）
        evt_obj.on('mousedown',function(evt){
          var pri_pos = {'left':evt.pageX,'top':evt.pageY};
          //alert(pri_pos['left']);
          evt_obj.on('mousemove',function(evt){
            var cur_pos = {'left':evt.pageX,'top':evt.pageY};
            var offsetX = cur_pos['left']- pri_pos['left'];//横向偏移
              console.log(originl_offsetX+offsetX);
              evt_obj.css({'left':originl_offsetX+offsetX+"px"});
              var screen_width = window.screen.width;
              //alert(parseInt(evt_obj.css('left')));
              if(parseInt(evt_obj.css('left')) > screen_width*0.9){
                     evt_obj.animate({left:screen_width+'px'},'5s','linear',function(){
                    $(this).remove();
                    get_new_page();
                  });
              }else if(parseInt(evt_obj.css('left')) < screen_width*0.1){
                evt_obj.animate({left:-evt_obj.width()+'px'},'5s','linear',function(){
                    $(this).remove();
                    get_new_page();
                  });
              }


          });
        });
        evt_obj.on('mouseup',function(evt){//鼠标抬起，删除mousemove事件
            evt_obj.off('mousemove');//删除mousemove事件
            evt_obj.animate({'left':left},500,'swing');//没有触发加载下一章事件，文章回到原位
        });
       
      };
    });