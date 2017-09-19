/**
 * Created by qianfeng on 2017/9/14.
 */
require(["config"],function () {
    require(["jquery","template","cookie","load"],function ($,template) {
        $(function () {
            $.getJSON("/mock/cart.json", function(data){
                var html = template("cart_hot_temp", {hot_temps: data.cart_hot});
                $(".thumb_con").html(html);

                //判断是否有之前保存的cookie
                $.cookie.json=true;
                var _uname = $("#header").find(("#username")).html(),
                    flag = ( _uname === "登录") ? false : true, //保存用户的登录状态标志
                    _cartlists = !flag ? ($.cookie("unlogin") || []) : ($.cookie(_uname) || []);


                //保存cookie函数
                function cookie_save(_uname,_cartlists) {

                    var _totalnumber = 0 ,
                        _totalprice = 0,
                        length = _cartlists.length;
                    for ( var i = 0 ; i<length ; i++){
                        _totalnumber += Number(_cartlists[i].number);
                        _totalprice += Number( _cartlists[i].sub);
                    }
                    _cartlists[length-1].kind = _cartlists.length;
                    _cartlists[length-1].totalprice = _totalprice;
                    _cartlists[length-1].totalnumber = _totalnumber;

                    $(".cart_number").html(_cartlists[length-1].totalnumber);

                    if(_uname === "登录"){
                        $.cookie("unlogin" , _cartlists ,{ path:"/"});
                    }else {
                        $.cookie( _uname , _cartlists , {expires:1, path:"/"});
                    }
                    console.log(_cartlists);
                }

                if( _cartlists.length === 0){
                    //购物车为空时
                    $(".cart_none_2").show();
                    $(".panel_body").hide();
                    $(".panel_footer").hide();
                    $(".panel_heading a").css( "visibility" , 'hidden');
                }else {
                    //购物车不为空
                    $.each(_cartlists ,function (index, element) {
                        //克隆节点模板
                        $(".panel_body").find(".hide").clone(true)
                            .data("list" , this)
                            .removeClass("hide").addClass("goods_item")
                            .appendTo("tbody")
                            .find(".g_img").attr({"src" : this.imgSrc , "alt" : this.name}).end()
                            .find(".g_info").find("a").html(this.name).end().end()
                            .find(".g_info").find("p").html("规格：" + this.size).end().end()                                                                                         .find(".g_price").find("span").html("￥" + this.price).end().end()
                            .find(".goods_num").val(this.number).end()
                            .find(".g_totalprice").html(this.sub)
                    });

                    /****************************************/
                    //加减数量
                    $("tbody").on("click" , ".minus_num , .add_num" , function () {
                        //获取所在行
                        var _tr = $(this).parents("tr");
                        var _list = _tr.data("list");//获取缓存数据

                        if( $(this).is(".add_num")){
                            //数量加
                            _list.number ++;
                        }else {
                            //数量减
                            if( _list.number <= 1){
                                alert("数量不能再少啦！！！");
                                return;
                            }
                            _list.number --;
                        }
                        //显示修改后的数量
                        _tr.find(".goods_num").val(_list.number);
                        //计算并显示小计
                        _tr.find(".g_totalprice").html( _list.price * _list.number);
                        //更新小计
                        _list.sub = _list.price * _list.number;

                        //刷新合计
                        calcTotal();


                        //将数组保存会cookie
                        cookie_save(_uname,_cartlists);
                    });

                    //数量输入改变
                    $(".goods_num").blur( function () {
                        var _tr = $(this).parents("tr");
                        var _list = _tr.data("list");
                        if (!/^[1-9]\d*$/.test($(this).val())) { // 数字格式错误
                            $(this).val(_list.number);
                            return;
                        }
                        //保存修改值到对象中
                        _list.number = $(this).val();
                        //计算并显示小计
                        _tr.find(".g_totalprice").html( _list.price * _list.number);
                        //更新小计
                        _list.sub = _list.price * _list.number;
                        //将数组保存会cookie
                        cookie_save(_uname,_cartlists);

                        console.log($.cookie("unlogin"));
                        calcTotal();
                    });
                    /********* 删除 *********/
                    $("tbody").on("click" , ".g_btu a",function () {
                        var _tr = $(this).parents("tr");
                        var _list = _tr.data("list");
                        //获取当前商品对象在商品队列中的下标
                        var index = $.inArray( _list , _cartlists);
                        //从数组中删除
                        _cartlists.splice( index ,1);
                        //保存回cookie
                        cookie_save(_uname,_cartlists);

                        //页面删除
                        _tr.remove();
                        calcTotal();
                        return false;
                    });

                    /********************************************/
                    /****** 全选 *******/
                    $(".selectAllGoods").click(function () {
                        //获取复选框状态
                        var status = $(this).prop("checked");
                        //将商品行前的状态改为和全选框一致
                        $(".selectGoods").prop("checked",status);
                        calcTotal();
                    });
                    /*单选*/
                    $(".goods_item .selectGoods").click(function () {
                        var length = $(".goods_item .selectGoods:checked").length;
                        $(".selectAllGoods").prop("checked",length===_cartlists.length);
                        calcTotal();
                    });

                    /*************************************************/
                    /***** 合计金额函数 ******/
                    function calcTotal() {
                        //获取选中商品
                        var _trs = $(".goods_item .selectGoods:checked").parents("tr");
                        //遍历，累计金额
                        var sum = 0;
                        _trs.each(function (index,element) {
                            sum += Number($(this).find(".g_totalprice").text());
                        });
                        //显示合计
                        $("#or_cost").html("原始金额：￥"+sum);

                        //更新总金额
                        var discount = Number( $("#discounts").html().slice(12));
                        end_total( sum, discount);
                    }


                /**************************************************/
                    /***** 删除选中行 *******/
                    $(".clear_check").click(function () {
                        //获取选中行
                        var _trs = $(".goods_item .selectGoods:checked").parents("tr");
                        //遍历，删除
                        _trs.each(function (indx, element) {
                            //获取商品的缓存对象
                            var _list = $(this).data("list");
                            //下标
                            var _index = $.inArray(_list,_cartlists);
                            //从数组删除
                            _cartlists.splice(_index,1);
                        });
                        //保存回cookie
                        cookie_save(_uname,_cartlists);
                        //从页面中删除
                        _trs.remove();
                        calcTotal();
                        return false;
                    });

                    /*******************************************************/
                    /****** 清空购物车 ******/
                    $(".panel_heading a").click(function () {

                        $.removeCookie( _uname , {path:"/"});
                        $.removeCookie( "unlogin" ,{path:"/"});

                        $(".cart_none").show();
                        $(".panel_body").hide();
                        $(".panel_footer").hide();
                        $(".panel_heading a").css( "visibility" , 'hidden');

                        $("#or_cost").html("原始金额：￥0");
                        $("#discounts").html("优惠金额：￥0");
                        $(".total b").html("￥0");

                    });

                    /****************************************!/
                    /***** 最后总金额函数 ******/
                    function end_total( a ,b ) {
                        $('.total b').text(a-b);
                    }

                }

                        /*************************************************************************/
                /******** 去结算 ***********/
                $("#cart_ajax_update").on("click" , "div .btu_danger" , function () {
                    if( !flag ){
                        //用户未登录
                        $(this).attr( "href" , "/html/login.html");
                    }
                    else{
                        $(this).attr( "href" , "/html/cart_checkout.html")
                    }
                })
            });





        })
    });
});





















