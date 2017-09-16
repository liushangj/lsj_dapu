/**
 * Created by qianfeng on 2017/9/15.
 */
require( ["config"] , function () {
    require( ["jquery" , "template" ,"cookie" ,"load"] ,function ($ , template) {
        var h = $("#header");
        console.log(h);

        $(function () {
            // 从 mock/products.json 文件中加载商品数据
            $.getJSON("/mock/product_1927.json", function(data){
                // 渲染模板
                var html = template("may_like", {like_model:data.prod_1927_like});
                // 显示
                console.log("xx");
                $(".may_like_container").html(html);
            });

        })

    })
});