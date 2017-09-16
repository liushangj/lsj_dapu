/**
 * Created by qianfeng on 2017/9/15.
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
            var imgsrc = [
                [ "/image/11.jpg","/image/12.gif","/image/13.jpg","/image/14.jpg" ,"/image/15.jpg" ,"/image/15.jpg" ],
                [ "/image/21.jpg","/image/22.jpg","/image/13.jpg","/image/14.jpg" ,"/image/15.jpg" ,"/image/15.jpg" ],
                [ "/image/31.jpg","/image/12.gif","/image/22.jpg","/image/14.jpg" ,"/image/15.jpg" ,"/image/15.jpg" ],
                [ "/image/41.jpg","/image/12.gif","/image/42.jpg","/image/14.jpg" ,"/image/15.jpg" ,"/image/15.jpg" ]
            ];
            var _goodsBn = [ "1012000265" , "1012000266" , "1012000267" ,"1012000268" , "1012000269"];

            $(_rightlis).on( 'click',function () {
                $(this).find("i").show().parent().css( 'border','1px solid #b1544f')
                    .parents("li").siblings().find("a").css('border' , '1px solid #ccc').find("i").hide();
                $(this).addClass("check_size").siblings().removeClass("check_size");
                var index = $.inArray(this,_rightlis);
                    $(_imglis[0]).children("img").attr('src',imgsrc[index][0]);
                    $(_imglis[1]).children("img").attr('src',imgsrc[index][1]);
                    $(_imglis[2]).children("img").attr('src',imgsrc[index][2]);
                    $(_imglis[3]).children("img").attr('src',imgsrc[index][3]);
                    $(_imglis[4]).children("img").attr('src',imgsrc[index][4]);
                    $(".goods_big").find("img").attr("src",imgsrc[index][0]);
                    $("#goodsBn").text(_goodsBn[index]);

                    if( index === 3 || index === 2){
                        //改变价格
                        $(".nomal_price").text('￥168');
                        $(".mlvprice").text('￥160');
                    }else {
                        $(".nomal_price").text('￥158');
                        $(".mlvprice").text('￥150');
                    }

            });


        })
    });
});