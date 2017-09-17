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
                    _cartlists = [];
                if( _uname === "登录"){
                    //未登录用户
                    _cartlists = $.cookie("unlogin") || [];

                    if( _cartlists.length === 0){
                        //购物车为空时
                        $(".cart_none").show();
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
                                            .find(".g_info").find("p").html("规格：" + this.size).end() .end()                                                                  .find(".g_price").find("span").html("￥" + this.price).end().end()
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
                            //将数组保存会cookie
                            $.cookie("unlogin" , _cartlists ,{ path:"/"});
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
                            $.cookie("unlogin" , _cartlists ,{ path:"/"});
                            console.log($.cookie("unlogin"))
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
                            $.cookie("unlogin" , _cartlists ,{ path:"/"});
                            //页面删除
                            _tr.remove();
                            return false;
                        })

                    }
                }
            });




        })
    });
});





















