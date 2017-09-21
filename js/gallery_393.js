/**
 * Created by qianfeng on 2017/9/18.
 */
require(["config"],function () {
    require(["jquery","template","cookie","load","carousel"],function ($,template){
        $(function () {

            /**********************  recent-item   ***********************/
            $.getJSON("/mock/gallery_393.json", function (data) {
                var recent_list = template("recent_list", {_recent: data.recent_list});
                $(".items").append(recent_list);
            });

            //清除事件
            $(".clearAll").on("click",function () {
                $(".items").find("*").hide();
            });



            /**********************  bfd_list  ***********************/
            $.getJSON("/mock/gallery_393.json", function (data) {
                var bfd_list = template("bfd_list", {_bfd: data.bfd_list});
                $(".bfd_content").find("ul").append(bfd_list);
            });


            /***********************   main_con   *********************/
            $(".hd").find("h1").text($("#last_name").text());

            /******************  products *********************/
            $.getJSON("/mock/gallery_393.json", function (data) {
                var products = template("prods_list", {_product: data.products_list});
                $("#products_list").append(products);
            });



            $(".item").find("div").hide();
            $("#item_393").find("*").show();
        })
    })
});






















