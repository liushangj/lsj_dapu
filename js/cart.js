/**
 * Created by qianfeng on 2017/9/14.
 */
require(["config"],function () {
    require(["jquery","template"],function ($,template) {
        console.log("............");
        $.getJSON("/mock/cart.json", function(data){
            var html = template("cart_hot_temp", {hot_temps: data.cart_hot});
            $(".thumb_con").html(html);
        });
    })
});