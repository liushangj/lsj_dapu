/**
 * Created by qianfeng on 2017/9/11.
 */
$(function () {

    //手机号
    $("#mobile").on("click",function () {
        $("#error_mobile").show();
    })
    //验证码
    $("#v_code").on( 'click', function () {
        $d = new Date();
        $t = $d.getTime();
        $(this).next(".verfyCode_sj").children().attr( 'src' , 'http://www.dapu.com/passport-verifyCode.html?t='+$t);
        $(this).next(".verfyCode_sj").show();
    })

});






























