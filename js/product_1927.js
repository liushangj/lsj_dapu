/**
 * Created by qianfeng on 2017/9/13.
 */
require( ["config"] , function () {
    require(["jquery", "template", "cookie", "zoom", "load"], function ($, template) {
        $(function () {
            //得到所有的li
            var _imglis = $(".small_ul li");
            $(_imglis).hover(function () {
                var imgSrc = $(this).children("img").attr("src");
                $(".goods_big").find("img").attr("src", imgSrc);
                $(".zoomWindow").css("background-image", 'url(' + imgSrc + ')');
            }, function () {
            });
            //放大镜
            $(".con_img").elevateZoom();

            /********* 规格选择 ***********/

            var _rightlis = $(".right_ul li");
            var imgsrc_1 = ["../image/big1.jpg", "../image/big2.jpg", "../image/big3.jpg", "../image/big4.jpg", "../image/big5.jpg"];
            var imgsrc_0 = ["../image/large1.jpg", "../image/lager2.jpg", "../image/l3.jpg", "../image/l4.jpg", "../image/l5.jpg"];

            $(_rightlis).on('click', function () {
                $(this).addClass("check_size").siblings().removeClass("check_size");
                $(this).find("i").show().parent().css('border', '1px solid #b1544f')
                    .parents("li").siblings().find("a").css('border', '1px solid #ccc').find("i").hide();
                var index = $.inArray(this, _rightlis);
                if (index === 0) {
                    $(".nomal_price").text('￥99');
                    $(".mlvprice").text('￥94');
                    $("#goodsBn").text("101201154455");
                    $(_imglis[0]).children("img").attr('src', imgsrc_0[0]);
                    $(_imglis[1]).children("img").attr('src', imgsrc_0[1]);
                    $(_imglis[2]).children("img").attr('src', imgsrc_0[2]);
                    $(_imglis[3]).children("img").attr('src', imgsrc_0[3]);
                    $(_imglis[4]).children("img").attr('src', imgsrc_0[4]);
                    $(".goods_big").find("img").attr("src", imgsrc_0[0]);
                } else if (index === 1) {
                    $(".nomal_price").text('￥179');
                    $(".mlvprice").text('￥170');
                    $("#goodsBn").text("101201154466");
                    /********* 改变图片的路径 **********/
                    $(_imglis[0]).children("img").attr('src', imgsrc_1[0]);
                    $(_imglis[1]).children("img").attr('src', imgsrc_1[1]);
                    $(_imglis[2]).children("img").attr('src', imgsrc_1[2]);
                    $(_imglis[3]).children("img").attr('src', imgsrc_1[3]);
                    $(_imglis[4]).children("img").attr('src', imgsrc_1[4]);
                    $(".goods_big").find("img").attr("src", imgsrc_1[0]);
                }
            });

            /********** qrcode_img 显示 ***********/
            $(".qrcode_text").hover(function () {
                $(".qrcode_img").show();
                $(".qrcode_text").css('border-bottom', 'none');
            }, function () {
                $(".qrcode_img").hide();
                $(".qrcode_text").css('border-bottom', '1px solid #dcdcdc');
            });

            /************** 相关分类显示 *****************/
            var _catlists = ['新农鲜果', '烹调食材', '特色美食', '茶艺生活', '居家必备'];
            var _catul = $(".cat_list ul");
            //添加到页面
            for (let i = 0; i < _catlists.length; i++) {
                $(".cat_list").find(".hide").clone(true).removeClass("hide").addClass("show")
                    .children("a").html(_catlists[i]).parent().appendTo(_catul);
            }

            /*********************** 详情页面的售后和评价显示  ************************/
            $(".tab_nav li").click(function () {
                $(this).addClass("on").siblings().removeClass("on");
                console.log(this);
                if ($(this).is(".server")) {
                    $("#aftersales_comment").show();
                    $("#product_comment").hide();
                }
                if ($(this).is("#tag_3")) {
                    $("#product_comment").show();
                    $("#aftersales_comment").hide();
                    console.log(this);
                }
                if ($(this).is(".xiangqing")) {
                    $("#aftersales_comment").hide();
                    $("#product_comment").hide();
                }
            });
            /********************** 滚动定位事件************************/
            //tab_nav在文档中的定位
            $(window).on('scroll', function () {
                //获取滚动高度
                var _scrollTop = $(window).scrollTop();
                if (_scrollTop >= 680) {
                    $(".tab_nav").addClass("fix");
                } else {
                    $(".tab_nav").removeClass("fix");
                }
            });
            /***************** mini_cart ***********************/
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
            })

        });
    })
});















