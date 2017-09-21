/*
/!**
 * Created by qianfeng on 2017/9/13.
 *!/
*/
define( ["jquery" , "cookie" , "template" ,"swiper" ] , function () {

    /**************** head ********************/
    $.ajax({
        url : "/html/include/head.html",
        type : "get",
        success : function(data) {
            $("#header").html(data);

            $.cookie.json=true;
            var newUser = $.cookie("newUser");
            console.log(newUser);

            var uname = "";
            if( newUser ){ uname =newUser.phone }

            var cartlists = ( newUser ) ? ( $.cookie(uname) || [] ) : ( $.cookie("unlogin") || [] ),
                length = cartlists.length;

            if( length === 0){
                //没有选购商品
                $(".cart_number").html("0");
                $(".cart_bar").hover(function () {
                    $(".cart_none").show();
                },function () {
                    $(".cart_none").hide();
                })
            }else {
                //选购了商品
                $(".cart_number").html(cartlists[length-1].totalnumber);
                //显示商品的细节
                //显示mini_cart
                $(".cart_bar").hover(function () {
                    $(".minicart_con").show().find(".item_totalnumber").html(cartlists[length-1].totalnumber).end()
                        .find(".totalprice").html(cartlists[length-1].totalprice);
                },function () {
                    $(".minicart_con").hide();
                });
                if(length >= 3){
                    //显示前三个商品
                    for ( var i = 0 ; i < 3 ; i++){
                        var _list = cartlists[i];
                        $(".goodsList_hide").clone(true).data("list" , _list)
                            .removeClass("goodsList_hide").addClass("goodsList")
                            .appendTo($(".minicart_con"))
                            .find(".mini_goodspic img").attr("src" , _list.imgSrc).end()
                            .find(".nc_name").attr( "href" ,_list.url).html(_list.name+"(规格："+_list.size+")").end()
                            .find(".nc_price").html("￥" + _list.price).end()
                            .find(".nc_number").html(_list.number);
                    }
                    $(".more").show();
                }else {
                    $.each(cartlists,function () {
                        $(".goodsList_hide").clone(true).data("list" , this)
                            .removeClass("goodsList_hide").addClass("goodsList")
                            .appendTo($(".minicart_con"))
                            .find(".mini_goodspic img").attr("src" , this.imgSrc).end()
                            .find(".nc_name").attr( "href" ,this.url).html(this.name+"(规格："+this.size+")")
                            .find(".nc_price").html("￥" + this.price).end()
                            .find(".nc_number").html(this.number);
                    });
                    $(".more").hide();
                }
            }
            if( newUser ){
                $("#username").html(uname);
                $("#quit").html("退出");
                    /*$(".cart_number").html("0");
                    $("#username").html("登录");
                    $("#quit").html("注册").attr("href" , "/html/signup.html");
                    $.removeCookie("newUser");*/

               /* $("#quit").attr("href" , "/html/signup.html");*/
            }
            $("#quit").on( "click" , function () {
               if( $(this).html() === "退出"){
                   $(".cart_number").html("0");
                   $("#username").html("登录");
                   $("#quit").html("注册");
                   $.removeCookie("newUser");
                   return false;
               }
            });
            /***************************************************/
            /************** 登录、注册按钮 *****************/
            var _url = window.location.href;
            if( _url === "http://127.0.0.1:8080/html/signup.html" || _url === "http://127.0.0.1:8080/html/login.html"){
                //如果为注册或登录页面，隐藏
                $(".login_bar").hide();
                $(".nav_table").remove();
                $(".nav_show_bg").remove();
            }

        }
    });

    /******************************************************************/
    $("#right_banner").load("/html/include/right_banner.html");
    $("#footer").load("/html/include/foot.html");

    /*********************************************************************/
    //故事分享评论
    $.ajax({
        url : "/html/include/comments.html",
        type : "get",
        success : function(data) {
            $(".comment_con").html(data);

            /**************************************************/
            /************ 显示之前的评论 *****************/
            //从数据库拿到数据
            /*$.post(
                "http://localhost/comments_select.php",
                function (data) {
                    console.log(data);
                    if (data.status === 1) {
                        console.log("成功");
                     } else {
                        console.log("失败");
                    }
                    //保存到cookie中
                    $.cookie("user_comments" , data.data);
                   /!* console.log( Date.parse($.cookie("user_comments").days));*!/
                }, "json");*/

            //显示评论
            var _user_comments = $.cookie("user_comments") || [];
            console.log(_user_comments);
            $.each(_user_comments , function () {
                this.days = new Date(Date.parse(this.days));
                 var time = this.days.getHours() + " : " + ( "0" + this.days.getMinutes()).slice(-2) + " : " + ( "0" + this.days.getSeconds()).slice(-2);
                //克隆节点
                $(".comment_item_hide").clone(true).removeClass("comment_item_hide")
                    .appendTo("#comment")
                    .find("img").attr("alt", this.id).end()
                    .find(".item_name").html(this.id).end()
                    .find(".item_days").html(time).end()
                    .find(".item_wd").html(this.wd);
            });
            //评论数
            $(".comm_num").text(_user_comments.length);

            /*********** 查看评论 *****************/
            $(".to_see_comm").siblings().text($(".comm_num").text());

            /************ 发表评论 ************/
            $(".send_msg").on( "click" , function () {
                var wd = $("#wd").val();
                var user = $.cookie("newUser") || [];
                if (user.length === 0) {
                    alert("请先登录！");
                    location = "/html/login.html";
                }
                //已经登录
                var days = new Date();
                console.log(days);

                var time = days.getHours() + " : " + ( "0" + days.getMinutes()).slice(-2) + " : " + ( "0" + days.getSeconds()).slice(-2);
                //克隆节点
                $(".comment_item_hide").clone(true).removeClass("comment_item_hide")
                    .appendTo("#comment")
                    .find("img").attr("alt", user.phone).end()
                    .find(".item_name").html(user.phone).end()
                    .find(".item_days").html(time).end()
                    .find(".item_wd").html(wd);
                var _user_comments = $.cookie("user_comments") || [];
                //评论数
                $(".comm_num").text(Number(_user_comments.length)+1);

                /*********** 查看评论 *****************/
                $(".to_see_comm").siblings().text($(".comm_num").text());

                //保存到cookie
                var _comment = {
                    id: user.phone,
                    wd: wd,
                    days: days
                };
                _user_comments.push(_comment);
                $.cookie("user_comments", _user_comments);
                console.log(Date.parse(_user_comments[0].days));



            /************ 发表评论 ************/
           /* $(".send_msg").on( "click" , function () {
                var wd = $("#wd").val();
                var user = $.cookie("newUser") || [];
                if (user.length === 0) {
                    alert("请先登录！");
                    location = "/html/login.html";
                }
                //已经登录
                var days = new Date();
                console.log(days);*/

                //数据保存到数据库
                //ajax 发送请求
                /*$.post(
                    "http://localhost/user_comments.php",
                    {"id": user.phone, wd: wd, days: days},
                    function (data) {
                        console.log(data);
                        if (data.status === 1) {
                            console.log("成功");
                        } else {
                            console.log("失败");
                        }

                        /!*!//保存在cookie中
                         $.cookie("comments_lists" , data);
                         console.log($.cookie("commments_list"));*!/
                    }, "json");*/

            });
            /*********************************************************/
            /*********** 点赞 *************/
            $("#praiseclick").on( "click" , function () {
                var user = $.cookie("newUser") || [];
                if (user.length === 0) {
                    alert("请先登录！");
                    location = "/html/login.html";
                }
                var old_num = Number($(this).siblings().text());
                $(this).siblings().text( old_num +1);
            });


        }




    });

    /*************************************/
    /************ gallery *************/
    $.ajax({
        url: "/html/include/gallery.html",
        type: "get",
        success: function (data) {
            $("#gallery").html(data);
            $(".item").find("div").hide();

           /* $(".bd").find(".item").children().hide();*/
            var url = window.location.href;
            if( url === "http://127.0.0.1:8080/html/woshi.html"){
                $(".header_f1 em").text("卧室用品");
                $("#item_67").find("*").show();

            }
            if( url === "http://127.0.0.1:8080/html/gallery-393.html"){
                $("#item_393").find("*").show();
            }
            $("#tp_name").html($(".header_f1 em").text());

        }
    });
});





















