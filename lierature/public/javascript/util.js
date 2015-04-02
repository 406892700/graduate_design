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
        }
})(window,$)