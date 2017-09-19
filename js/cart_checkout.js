/**
 * Created by qianfeng on 2017/9/18.
 */
require(["config"],function () {
    require(["jquery","template","cookie","load","carousel"],function ($,template){

        $(function () {
            /*******************************************************/
            /*********** 地区选择 **************/
            var url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1",
                url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
            $.when( $.ajax( url1) , $.ajax( url2 )).then( function ( data1 , data2 ) {
                var provinces = data1[0].showapi_res_body.data.concat( data2[0].showapi_res_body.data );
                //添加省份信息
                var html ='';
                $.each( provinces ,function () {
                    html += `<option value="${this.id}">${this.areaName}</option>`
                });
                $("#province").append(html);
            });
            //显示市级信息
            $("#province").change( function () {
                $(".city").show();
                $("#county").val( $("#county option:first-child").html());
                $("#select_area_info").html("[地区]");
                //选取对应的id
                var _id = $(this).val();

                if (_id === "_null_"){
                    $(".city").hide();
                    $(".county").hide();
                    return;
                }

                var url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _id;
                //异步请求
                $.getJSON( url , function (data) {
                    var cities = data.showapi_res_body.data;
                    var html = '';
                    $.each( cities , function () {
                        html +=  `<option value="${this.id}">${this.areaName}</option>`
                    });
                    $("#city").html(html);
                })
            });
            //显示县级信息
            $("#city").change ( function () {
                $(".county").show();
                $("#select_area_info").html("[地区]");
                //选取对应的id
                var _id = $(this).val();
                if( _id === "_null_"){
                    $(".county").hide();
                    return;
                }
                console.log(_id);

                var url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _id;
                //异步请求
                $.getJSON( url , function (data) {
                    var cities = data.showapi_res_body.data;
                    var html = '';
                    $.each( cities , function () {
                        html +=  `<option value="${this.id}">${this.areaName}</option>`
                    });
                    $("#county").html(html);
                });

            });
            //页面显示选择的地址
            $("#county").change(function () {
                $("#select_area_info").html($("#province option:selected").html()+""+$("#city option:selected").html()+""+$("#county option:selected").html());
            });
            // 判断是否选择了地区
            $("#province").click(function () {
                //获取选择的项
                var _option = $(this).find("option:selected").val();
                if (_option === "_null_") {
                    $("#order_area_info").show();
                }
                else {
                    $("#order_area_info").hide();
                }
            });

            /*******************************************/
            /*******  判断用户名是否输入 *********/
            $("#name").blur(function () {
                if($(this).val() === ""){
                    $("#order_name_info").show();
                }else {
                    $("#order_name_info").hide()
                }
            });
            /************ 判断是否输入详细地址 ***************/
            $("#addr").blur(function () {
                if($(this).val() === ""){
                    $("#order_small_area_info").show();
                }else $("#order_small_area_info").hide();
            });
            /************ 电话号码 ****************/
            $("#tel , #mobile").blur(function () {

                if( $("#tel").val() === "" && $("#mobile").val()=== ""){
                    $("#order_mobile_info").show();
                }else $("#order_mobile_info").hide();
            });
            /*********** 地址提交判断 **************/
            $(".btn_check_addr").click(function () {
                //保存添加的收货信息
                var _receiving_msg = {
                    name :  $("#name").val(),
                    area :  $($("#select_area_info")[0]).html(),
                    addr : $("#addr").val(),
                    mobile : $("#mobile").val(),
                    tel : $("#tel").val(),
                    zip : $("#zip").val(),
                    day : $("#ceveing_day option:selected").html()
                };

                console.log(_receiving_msg);
                //将收货信息保存到用户信息中


                if( ( $("#name").val()!== "") && ( $("#order_area_info").css("display") === "none" ) && ( $("#addr").val() !== "" ) && ( $("#order_mobile_info").css( "display") === "none" )){
                    $("#addr_edit").find("table").hide();
                    $(".btn_check_addr").hide();
                    $("#addr_box").removeClass("border_2");//修改边框
                    $("#payment_box").addClass("border_2");
                    $("#receiver").show();
                    $("#receiver_addr").show().find("#name_span").html(_receiving_msg.name).end()
                                        .find("#area_span").html(_receiving_msg.area).end()
                                        .find("#addr_span").html(_receiving_msg.addr).end()
                                        .find("#zip_span").html(_receiving_msg.zip).end()
                                        .find("#mobile_span").html(_receiving_msg.mobile).end()
                                        .find("#tel_span").html(_receiving_msg.tel).end()
                                        .find("#day_span").html(_receiving_msg.day);
                    //找到没有填写的项
                    var _spans = $(".hid_item span");
                    console.log(_spans);
                    $.each( _spans , function () {
                        if ( $(this).html() === ""){
                            $(this).parent().remove();
                        }
                    })
                }
            });
            /******* 显示保存的地址信息 ***********/





        })
    })
});
































