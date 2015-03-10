/**
 * Created by Administrator on 15-1-29.
 */

;(function(global,$){
	$.fn.count_word = function(){
        console.log('dsdfdsfdss');
        var that = this;
        var init = function(){
            that.bind('keyup',function(e){
                var $word_num = that.parent().children('.word_num');
                $word_num.text($(this).val().length);
            });
        }

        return this.each(function(){
            init();
        });
    }
})(window,$)