/**
 * Created by qianfeng on 2017/9/15.
 */
$(function () {

    if( event.keyCode === 13){
        check();
    }

    $("#uname,#psd").blur(function () {
        check();
    });

    //封装检验输入是否为空的函数
        function check() {
            if( $("#uname").val() === ""){
                //为空时
                $("#check_name").show().text("请输入用户名！")
            }else if( $("#uname").val() !== "" ){
                $("#check_name").hide();
            }
            if( $("#psd").val() === ""){
                $("#check_psd").show().text("请输入密码！")
            }else if ( $("#psd").val() !== ""){
                $("#check_psd").hide();
            }
        }


    //判断是否有缓存的cookie
    $.cookie.json=true;
    var _userlists = $.cookie("userLists") || [];
    if(_userlists.length !== 0){

        var length = $(_userlists).length;
        var lastuser = $(_userlists).eq(length-1)[0];
        //显示预缓存的用户名
        $("#uname").val(lastuser.phone);
    }

    console.log(_userlists);
    //判断登录输入是否正确
    $("#login").on("click",function () {

        var phone = $("#uname").val(),
            password = $("#psd").val();
        var newuser = {
            phone : phone,
            password : password
        };
        var index = indexOf(phone,"phone",_userlists);
        console.log(index);
        if(index === -1){
            //用户名不存在
            $("#check_name").text("用户名不存在").show();
        }else {
            if ( password !== $(_userlists).eq(index)[0].pwd ){
                $("#check_psd").show().text("密码输入错误！")
            }else if ( password === $(_userlists).eq(index)[0].pwd ){
                //输入正确

                //保存现在这个用户信息
                //判断之前是否有用户在登录
                //
                $.cookie("newUser",newuser,{expire:10/*,path : '/'*/});

                location="http://127.0.0.1:8080/html/index.html"
            }
        }
    })

});






















