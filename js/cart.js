/**
 * Created by qianfeng on 2017/9/14.
 */
require(["config"],function () {
    require(["jquery","template","cookie"],function ($,template) {
        $.getJSON("/mock/cart.json", function(data){
            var html = template("cart_hot_temp", {hot_temps: data.cart_hot});
            $(".thumb_con").html(html);
        });

        //判断是否有之前保存的cookie
        $.cookie.json=true;
        var _cartlists = $.cookie("cartlists") || [];
        //购物车为空时
        if( _cartlists.length === 0){
            $(".cart_none").show();
            $(".panel_body").hide();
            $(".panel_footer").hide();
            $(".panel_heading a").css( "visibility" , 'hidden')
        }
    })
});





















