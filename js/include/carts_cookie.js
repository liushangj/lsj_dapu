/**
 * Created by qianfeng on 2017/9/16.
 */
require( ["config"] , function () {
    require(["jquery", "template", "cookie", "zoom", "load"], function ($, template) {
        $(function () {


            /************** 相关分类显示 *****************/
            var _catlists = ['新农鲜果', '烹调食材', '特色美食', '茶艺生活', '居家必备'];
            var _catul = $(".cat_list ul");
            //添加到页面
            for (let i = 0; i < _catlists.length; i++) {
                $(".cat_list").find(".hide").clone(true).removeClass("hide").addClass("show")
                    .children("a").html(_catlists[i]).parent().appendTo(_catul);
            }

            /**************** 可能会喜欢部分数据加载 ******************/
            // 从 mock/products.json 文件中加载商品数据
            $.getJSON("/mock/prod_detail.json", function (data) {
                // 渲染模板
                var html = template("may_like", {like_model: data.prod_1927_like});
                // 显示
                $(".may_like_container").html(html);
            });

            /********************* 热销商品加载 ***************************/
            $(function () {
                // 从 mock/products.json 文件中加载商品数据
                $.getJSON("/mock/prod_detail.json", function(data){
                    // 渲染模板
                    var html = template("hot_sale", {hot_model:data.prod_1927_hot});
                    // 显示
                    $(".hot_sale_container").html(html);
                });

            });

            /********** qrcode_img 显示 ***********/
            $(".qrcode_text").hover(function () {
                $(".qrcode_img").show();
                $(".qrcode_text").css('border-bottom' , '1px solid #fff');
            },function () {
                $(".qrcode_img").hide();
                $(".qrcode_text").css('border-bottom' , '1px solid #dcdcdc');
            });

            /*********************** 详情页面的售后和评价显示  ************************/
            $(".tab_nav li").click(function () {
                $(this).addClass("on").siblings().removeClass("on");
                if( $(this).is(".server")){
                    $("#aftersales_comment").show();
                    $("#product_comment").hide();
                }
                if( $(this).is("#tag_3")){
                    $("#product_comment").show();
                    $("#aftersales_comment").hide();
                    console.log(this);
                }
                if( $(this).is(".xiangqing")){
                    $("#aftersales_comment").hide();
                    $("#product_comment").hide();
                }
            });

            /********************** 滚动定位事件************************/
            //tab_nav在文档中的定位
            $(window).on( 'scroll' , function () {
                //获取滚动高度
                var _scrollTop = $(window).scrollTop();
                if( _scrollTop  >= 680 ){
                    $(".tab_nav").addClass("fix");
                }else {
                    $(".tab_nav").removeClass("fix");
                }
            });

            /*************** mini-cart ******************/
            $(".tocart input").click(function () {
                $(".mini_cart").show();
                return false
            });
            $(".mini_cart .close").click(function () {
                $(".mini_cart").hide();
            });
            $(".rebuy").click(function () {
                $(".mini_cart").hide();
                return false;
            });

            /************** 加减数量 ************/
            $(".numinput").on( "click" , ".minus,.add" , function () {
                var prodnum = $("#pro_count").val();
                if( $(this).is(".minus")){
                    //如果为减
                    if( prodnum <=1 ){
                        return;
                    }else { prodnum--;}
                }
                if( $(this).is(".add")){
                    //如果为加
                    prodnum ++;
                }
                $("#pro_count").val(prodnum);
            });


            /********************** 保存cookie *************************/
            $(".btu_buy").on( "click" ,function () {
                var product = {
                    uname : "",
                    prod : [{
                        id : $("#goodsBn").text(),
                        price : $(".goods_price_box em").text().slice(1),
                        imgSrc : $(".small_ul li:first-child").find("img").attr("src"),
                        name : $(".goods_name").html(),
                        size : $(".right_ul").find(".check_size").find("span").text(),
                        number : $("#pro_count").val(),
                        sub : $(".goods_price_box em").text().slice(1)*$("#pro_count").val()
                    }]
                };
                //判断现在登录的用户
                if($("#username").html() !== "登录"){
                    //现在已经登录，保存到cookie中
                    product.uname = $("#username").html();
                }

                console.log(product);
                //从cookie中读取保存的购物车信息
                $.cookie.json = true;
                //如果为新用户
                if( product.uname === ""){
                    //读取新用户的cookie
                    var newproduct = $.cookie("newproduct") || [];
                    //判断商品是否重复
                    if ( newproduct === []){
                        //用户第一次点击购买
                        newproduct.push(product);

                    }/*else {
                        var new_index = indexOf( product.prod[0].id , "id" , newproduct.prod);
                        if( new_index !== -1){
                            //之前存在
                            var new_oldnum = newproduct.prod[new_index].number;//之前的数量
                            product.prod.number($("#pro_count").val()+new_oldnum);//修改现在的数量
                        }
                    }*/

                    //保存在cookie中
                    $.cookie("newproduct",newproduct);
                    console.log($.cookie("newproduct"));

                }/*else {
                    //为老用户时
                    var _products = $.cookie("products") || [];
                    //找出当前的这个人
                    var peo_index = indexOf( product.uname , "uname" , _products);
                    //判断商品是否重复
                    var prod = _products[peo_index].prod;//对应的商品信息数组
                    //判断商品是否重复
                    var prod_index = indexOf( product.prod.id , "id" , prod);
                    if(prod_index !== -1){
                        //之前存在此商品
                        var oldnum = prod[prod_index].number;//之前的数量
                        product.prod.number($("#pro_count").val()+oldnum);//修改现在的数量
                    }else {
                        //之前没有此商品
                        _products[peo_index].prod.push(product.prod);
                    }

                    //保存在cookie中
                    $.cookie("products" , _prosucts , {expires : 10 , path : "/"})
                }*/




               /* console.log("最后的保存:" ,$.cookie("products"));*/
            });






        })
    })
});








































