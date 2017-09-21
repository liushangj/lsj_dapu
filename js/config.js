/**
 * Created by qianfeng on 2017/9/15.
 */
require.config({
   baseUrl : "/",
    paths : {
       "jquery" : "lib/jquery/jquery-1.12-4.min",
        "template" : "lib/arttemplate/template-native",
        "cookie" : "lib/jquery-Plugins/jquery.cookie",
        "zoom" : "lib/jquery-Plugins/jquery.elevateZoom-2.2.3.min",
        "load" : "js/include/model",
        "carousel" : "js/carousel",
        "swiper" : "lib/swiper/swiper-3.4.2.min"
    },
    shim : {
       "zoom" : {
           deps : ["jquery"]
       },
        "swiper" : {
           deps : ["jquery"]
        }
    }
});