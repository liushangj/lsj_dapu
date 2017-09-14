/**
 * Created by qianfeng on 2017/9/13.
 */
$(function () {
    //得到所有的li
    var _imglis = $(".small_ul li");
    $(_imglis).hover(function () {
        var imgSrc = $(this).children("img").attr("src");
        $(".goods_big").find("img").attr("src",imgSrc);
        $(".zoomWindow").css("background-image",'url('+imgSrc+')');
    },function () { });
    //放大镜
    $(".con_img").elevateZoom();

    /********* 规格选择 ***********/

    var _rightlis = $(".right_ul li");
    var imgsrc_0 = [ "../image/big1.jpg","../image/big2.jpg","../image/big3.jpg","../image/big4.jpg"  ];
    var imgsrc_1 = [ "../image/prod1.jpg","../image/prod2.jpg","../image/prod3.jpg","../image/prod4.jpg"  ];

    $(_rightlis).on( 'click',function () {
        $(this).find("i").show().parent().css( 'border','1px solid #b1544f')
            .parents("li").siblings().find("a").css('border' , '1px solid #ccc').find("i").hide();
        var index = $.inArray(this,_rightlis);
        if ( index === 0){
            $(".nomal_price").text('￥99');
            $(".mlvprice").text('￥94');
           /* /!********* 改变图片的路径 **********!/
           $(_imglis[0]).css("src",'url('+imgsrc_0[0]+')');
            $(_imglis[1]).css("src",'url('+imgsrc_0[1]+')');
            $(_imglis[2]).css("src",'url('+imgsrc_0[2]+')');
            $(_imglis[3]).css("src",'url('+imgsrc_0[3]+')');
            $(".zoomWindow").css("background-image",'url('+imgsrc_0[0]+')');*/
        }else if( index === 1){
            $(".nomal_price").text('￥179');
            $(".mlvprice").text('￥170');
           /* /!********* 改变图片的路径 **********!/
            $(_imglis[0]).css("src",'url('+imgsrc_1[0]+')');
            $(_imglis[1]).css("src",'url('+imgsrc_1[1]+')');
            $(_imglis[2]).css("src",'url('+imgsrc_1[2]+')');
            $(_imglis[3]).css("src",'url('+imgsrc_1[3]+')');
            $(".zoomWindow").css("background-image",'url('+imgsrc_1[0]+')');*/

        }
    });

    /********** qrcode_img 显示 ***********/
    $(".qrcode_min").hover(function () {
        $(".qrcode_img").show();
        $(".qrcode_text").css('border-bottom' , 'none');
    },function () {
        $(".qrcode_img").hide();
        $(".qrcode_text").css('border-bottom' , '1px solid #dcdcdc');
    })
});
















