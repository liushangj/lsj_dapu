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
                if($(".right_ul").find(".check_size").length === 0){
                    return false;
                }else {
                    $(".mini_cart").show();
                    return false;
                }

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
            $.cookie.json = true;

            $(".btu_buy").on( "click" ,function () {
                var sizespan = $(".right_ul").find(".check_size"),
                    _number = $("#pro_count").val();
                if( sizespan.length === 0){
                    alert("请选择规格！");
                    return;
                }
                var product = {
                        id : $("#goodsBn").text(),
                        price : $(".goods_price_box em").text().slice(1),
                        imgSrc : $(".small_ul li:first-child").find("img").attr("src"),
                        name : $(".goods_name").html(),
                        size : $(sizespan).find("span").text(),
                        number : _number,
                        sub : $(".goods_price_box em").text().slice(1)*$("#pro_count").val()
                };
                var uname = $("#username").html();
                var _product =[];
                if ( uname === "登录"){
                    //用户没有登录
                    _product = $.cookie("unlogin") || [];
                    //判断商品是否有重复的
                    let index = indexOf( product.id , "id" , _product);
                    if( index === -1){
                        //不存在
                        _product.push(product);//加入购物车数组
                    }else {
                        //存在
                        _product[index].number = Number(_number) +  Number(_product[index].number);
                        _product[index].sub = Number( product.sub ) + Number( _product[index].sub);

                    }
                    //保存到cookie中
                    $.cookie("unlogin" , _product , { path:"/"});

                    console.log($.cookie("unlogin"));
                }else {
                    //已经登录
                    console.log(typeof uname);
                    _product = $.cookie(uname) || [];
                    console.log(_product);
                    //判断商品是否有重复的
                    let index = indexOf( product.id , "id" , _product);
                    if( index === -1){
                        //不存在
                        _product.push(product);//加入购物车数组
                    }else {
                        //存在
                        _product[index].number = Number(_number) + Number( _product[index].number) ;
                        _product[index].sub = Number( product.sub ) + Number( _product[index].sub);
                    }
                    //保存到cookie中
                    $.cookie( uname , _product , {expires:1, path:"/"});
                    console.log($.cookie(uname));
                }
            });


        });
    });
});








































