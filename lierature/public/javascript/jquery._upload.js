;(function($) {
    jQuery.fn.extend({
        uploadPreview : function(opts) {
            opts = jQuery.extend({
                scalingWidth : 0,
                scalingHeight : 0,
                imgPreview : null,
                imgType : [ "jpeg", "jpg", "bmp", "png" ],
                callback : function() {
                    return false;
                }
            }, opts || {});
 
            var _self = this;
            var _this = $(this);
            var imgPreview = $(opts.imgPreview);
            // 设置样式
            autoScaling = function() {
 
                imgPreview.css({
                    "width" : "150px",
                    "height" : "200px"
                });
 
                imgPreview.show();
            }
            // file按钮出发事件
            _this.change(function() {
                if (this.value) {
                    if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(
                            this.value.toLowerCase())) {
                        alert("图片类型必须是" + opts.imgType.join(",") + "中的一种");
                        this.value = "";
                        return false;
                    }
                    // 判断浏览器是否有FileReader接口
                    if (typeof FileReader == 'undefined') {
                        alert('请使用支持HTML5的浏览器,如IE10,Chrome,FireFox等.');
                        return false;
                    } else {
                        oFReader = new FileReader();
                        oFReader.onload = function(oFREvent) {
                            //imgPreview.attr('src', oFREvent.target.result);
                            imgPreview.css({'background':'url('+oFREvent.target.result+') no-repeat 0 0'});
                        };
                        var oFile = this.files[0];
                        oFReader.readAsDataURL(oFile);
                    }
                    // imgPreview.css({
                    //     "display" : 'none',
                    //     "width" : 'auto',
                    //     "height" : 'auto'
                    // });
                    setTimeout("autoScaling()", 100);
                }
                opts.callback();
            });
        }
    });
})(jQuery);