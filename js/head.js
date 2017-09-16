/**
 * Created by qianfeng on 2017/9/11.
 */
$(function(){
    var util=function(o){var me=this;};
    util.location=(function(url){window.location.href=encodeURI(url);});
    util._open=(function(url,type){window.open(encodeURI(url), type);});
    util.getLoad=(function(p,url,data){$(p).load(encodeURI(url));});
    util.getLoad("#header",'/html/head.html');
    util.getLoad("#footer",'/html/foot.html');
    util.getLoad("#right_bar","/html/right_banner.html");
    util.getLoad( "#total_container" , "/html/include/prod_detail.html");

});

