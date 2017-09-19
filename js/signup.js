/**
 * Created by qianfeng on 2017/9/11.
 */

require(["config"],function () {
    require(["jquery","template","cookie","load","carousel"],function ($,template){
        $(function () {

            //focus时的样式改变
            $("#yzm,#pwd,#pwd_again").focus(function () {
                $(this).css( "border" , "1px solid #656463");
            }).blur(function () {
                $(this).css( "border" , "1px solid #f9c908");
            });

            //定义注册的状态
            var checkNum = 0;
            //读取之前保存的用户名单cookie
            $.cookie.json =true;
            var _userList = $.cookie("userLists") || [];
            console.log(_userList);

            //手机号
            $("#mobile").on("click",function () {
                $("#error_mobile").show().html("请填写正确的手机号，目前仅支持中国大陆的手机号");
            }).blur(function () {
                //判断手机号是否已经存在
                if( indexOf($(this).val() , "phone" , _userList) !== -1){
                    //已经存在
                    $("#error_mobile").html("此手机号已经注册，请重新输入或直接登录");
                }else if ( indexOf($(this).val() , "phone" , _userList) === -1){
                    //不存在
                    var isMobile = /^[1]\d{10}$/;
                    if( isMobile.test($(this).val())){
                        $("#error_mobile").hide();
                        checkNum ++;//手机号成功状态加一
                    }else {
                        $("#error_mobile").show().html("请填写正确的手机号，目前仅支持中国大陆的手机号");
                    }
                }
            });

            //验证码
            $("#v_code").on( 'click', function () {
                $d = new Date();
                $t = $d.getTime();
                $(this).next(".verfyCode_sj").children().attr( 'src' , 'http://www.dapu.com/passport-verifyCode.html?t='+$t);
                $(this).next(".verfyCode_sj").show();
            });

            //密码
            $("#pwd").keyup(function () {
                var strongRegex = new RegExp("^(?=.{13,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                var enoughRegex = new RegExp("(?=.{6,}).*", "g");

                if( !enoughRegex.test($(this).val())){
                    //密码小于六位时强度弱，为灰色
                    $("#level").find(".pw-bar-on").css("width" , "60px")
                }else if ( mediumRegex.test($(this).val())){
                    //密码为七位及以上并且有哦字母、数字、特殊符号时，为中等
                    $("#level").find(".pw-bar-on").css("width" , "120px")
                }else if ( strongRegex.test($(this).val())){
                    //密码为8位及以上并且有字母、数字、特殊符号时，为最强
                    $("#level").find(".pw-bar-on").css("width" , "178px")
                }
            }).blur(function () {
                if ( $(this).val() === ""){
                    $("#level").find(".pw-bar-on").css("width" , "0")
                }
            });

            //再次输入密码验证
            $("#pwd_again").blur(function () {
                if( $(this).val() !== $("#pwd").val()){
                    //两次输入不相等
                    $("#error_pwd2").text("两次密码输入不一致！");
                }else if( $(this).val() === $("#pwd").val() && $(this).val()!== ""){
                    $("#error_pwd2").text("输入正确");
                    checkNum ++;//密码成功状态加一
                    console.log("num" ,checkNum);
                }
            });

            $("#mobile_reg_submit").on( 'click' , function () {
                //判断是否注册成功
                console.log("num" ,checkNum);
                if( checkNum === 2 && $("#license").attr("checked")){
                    //注册成功
                    alert("注册成功！");
                    //保存cookie
                    var user = {
                        phone : $("#mobile").val(),
                        pwd : $("#pwd").val()
                    };
                    _userList.push(user);
                    $.cookie("userLists",_userList,{expires:10,path:"/"});
                    console.log($.cookie("userLists"));

                    //保存现在注册的用户信息
                    $.cookie("newUser",user);
                    location="http://127.0.0.1:8080/html/index.html";
                }

            });

        });

    })
});































