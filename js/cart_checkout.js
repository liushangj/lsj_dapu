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
                    var html = '<option value="_null_">请选择</option>';
                    $.each( cities , function () {
                        html +=  `<option value="${this.id}">${this.areaName}</option>`
                    });
                    $("#city").html(html);
                });
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
                   /* $("#addr_edit").find("table").hide();*/
                    $(".new_shrxx_con").hide();
                    $("#recaddr_list").hide();
                    $("#order_pay_info").show();
                    $("#addr_box").removeClass("border_2");//取消边框
                    $("#payment_box").addClass("border_2");
                    $("#payment_edit").show();
                    $("#new_payment_con").hide();
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
                    $.each( _spans , function () {
                        if ( $(this).html() === ""){
                            $(this).parent().remove();
                        }
                    });
                }
            });
            /**************************************************/
            /********* 点击修改地址 ***********/
            $("#receiver").on("click" , function () {
               $("#receiver_addr").hide();
               $(".new_shrxx_con").show();
               $("#recaddr_list").show();
                $("#addr_box").addClass("border_2");//修改边框
            });

            /***************************************************/
            /*********** 支付方式修改 ****************/
            $(".pay_check").on( "click" , function () {
               $("#order_pay_info").hide();
               $("#payment_edit").hide();
               $("#payment_edit_btn").show();

               //修改边框样式
                $("#payment_box").removeClass("border_2");

               //保存选择的支付方式
                var payment = {
                    sendType : $("#sendType input:checked").siblings().text(),
                    payType : $("#table_payment input:checked").siblings().attr("alt")
                };
                console.log(payment);
                //显示支付方式
                $("#new_payment_con").show().find("#peisong_type").text(payment.sendType).end()
                                            .find("#peisong_value").text(payment.payType);

            });
            /****** 选择修改 *******/
            $("#payment_edit_btn").on( "click" , function () {
                $("#payment_edit").show();
                $("#new_payment_con").hide();
                $("#payment_edit_btn").hide();
                $("#payment_box").addClass("border_2");
            });

            /*************************************************************************/
            /************ 商品清单显示 ******************/
            //读取cookie保存的数据
            $.cookie.json=true;
            var _user = $.cookie("newUser").phone;
            var _cartlists = $.cookie(_user);
            console.log(_cartlists);
            $.each(_cartlists, function () {
               //克隆节点
                $(".g_item_hide").clone(true).removeClass("g_item_hide").addClass("g_item")
                                .appendTo(".product_tab tbody").data("list" , this)
                                .find(".g_img").attr( "src" , this.imgSrc).end()
                                .find(".g_pic a").attr( "href" , this.url).end()
                                .find(".g_info a").text(this.name).attr( "href" , this.url).end().end()
                                .find(".spec_info").text("规格：" + this.size).end()
                                .find(".g_price span").text("￥" + this.price).end()
                                .find(".g_number").text(this.number).end()
                                .find(".g_total").text("￥" + this.sub);
            });

            /********************************************************************/
            /*************** 所有优惠信息显示 *******************/
            //判断商品金额是否大于88元
            var sub = _cartlists[_cartlists.length-1].totalprice;
            if( sub >= 88){
                //满足88元包邮条件，显示优惠信息
                $(".saled_li").clone(true).removeClass("saled_li").appendTo("#checkout_saled ul")
                    .find("span").text("购物满88元包邮");
            }
            //商品金额
            $(".jiesuan_solution p:first-child").find("i").text(sub);
            //应付金额
            $("#due_amount").text( sub - Number($("#send_money i").text()) - Number( $("#sale_money i").text() ));

            /*******************************************************************/
            /********** 优惠券 **************/
            $("#check_member_coupon").on( "click" , function () {
                $("#coupon_number").val($(this).find("option:selected").val());
            });
            //判断是否使用优惠券
            $("#coupon_use").on("click" , function () {
                var _couponName = $("#check_member_coupon option:selected").html(),
                    _couponValue = $("#coupon_number").val();
                if(_couponValue === "" || _couponValue === "请输入优惠券号码"){
                    alert("请输入优惠券号码！");
                    return;
                }

               $(".coupon_list_check").show().find(".textcenter:first-child").text(_couponValue).end()
                                            .find(".centerth").text(_couponName);

                //查看是否有重复的优惠信息节点
                var _li = $("#checkout_saled li");
                //判断是否重复函数
                function check(_li) {
                    for ( var i=0 ; i < _li.length ; i++){
                        if( $(_li[i]).attr("id") === _couponValue){
                            return 0;
                        }
                    }
                    return 1;
                }
                if( check(_li) === 1){
                    //没有重复的，则复制
                    //克隆优惠项节点
                    $(".saled_li").clone(true).removeClass("saled_li").attr("id",_couponValue).prependTo("#checkout_saled ul")
                        .find("span").text("优惠券规格："+_couponName);
                    //修改优惠金额
                    var or_money = $("#sale_money i").html(),
                        new_money = Number( or_money ) + 10;
                    $("#sale_money i").html( new_money );

                    //应付金额
                    $("#due_amount").text( sub - Number($("#send_money i").text()) - Number( $("#sale_money i").text() ));

                }


            });

            //删除优惠券
            $(".delItem").on( "click" , function () {
                console.log(this);
               $(".check_del").show();
            });
            $(".close , .bottom button:nth-child(2)").on("click",function () {
                $(".check_del").hide();
            });
            $(".bottom button:first-child").on("click",function () {
               $(".check_del").hide();
               $(".coupon_list_check").hide();
               //删除优惠券对应的优惠信息
                $("#checkout_saled li:first-child").remove();
                //删除优惠金额
                var or_money = $("#sale_money i").html(),
                    new_money = Number( or_money ) - 10;
                $("#sale_money i").html( new_money );

                //应付金额
                $("#due_amount").text( sub - Number($("#send_money i").text()) - Number( $("#sale_money i").text() ));
            });
            /****************/
            /****** 礼品券 *****/
            $("#giftcard_use").on( "click" , function () {
                console.log();
                console.log( );
                if (  $("#giftcard_code").val() === "" || $("#giftcard_pwd").val() === ""){
                    alert("请输入礼品卡及密码！");
                }else {
                    alert("请输入正确的礼品卡卡号！");
                }
            });




        });
    });
});
































