/**
 * Created by qianfeng on 2017/9/15.
 */
require(["config"],function () {
    require(["jquery","template","cookie","load","carousel"],function ($,template){
        $(function () {
            //季节新品
            $(".season_container").on("mouseenter",".season_model",function () {
                $(this ).find(".season_wrapper").slideDown(500);
            }).on("mouseleave",".season_model",function () {
                $(this ).find(".season_wrapper").slideUp(500);
            });
            // 从 mock/products.json 文件中加载商品数据
            $.getJSON("../mock/index.json", function(data){
                // 渲染模板
                var html = template("season_temp", {season_model:data[0].season});
                // 显示
                $(".season_container").html(html);
            });

            //news
            $.getJSON("../mock/index.json",function (data) {
                var html = template( 'new_temp', { new_model:data[1].new});
                $(".new_con_big").html(html);
            });

            $(".new_main_con").on("mouseenter",".new_model",function () {
                $(this ).find(".new_wraper").slideDown(500);
            }).on("mouseleave",".new_model",function () {
                $(this ).find(".new_wraper").slideUp(500);
            });

            var _data = [
                { "href":"#", "img" : "../image/ss1.jpg", "name":"Roome智能光瓶","price":"RMB：199" },
                { "href":"#", "img" : "../image/ss2.jpg", "name":"星球杯", "price":"RMB：99"},
                { "href":"#", "img" : "../image/ss3.jpg", "name":"琢磨壶", "price":"RMB：458"},
                { "href":"#", "img" : "../image/ss4.jpg", "name":"Oclean智能声波牙刷",  "price":"RMB：399" },
                { "href":"#","img" : "../image/ss5.jpg","name":"大朴亲子灯","price":"RMB：99"},
                { "href":"#", "img" : "../image/ss6.jpg","name":"埃及长绒纯棉加厚款毛方浴套装", "price":"RMB：119"},
                { "href":"#", "img" : "../image/ss7.jpg","name":"斯里兰卡乳胶枕（面包款）", "price":"RMB：399"},
                {"href":"#", "img" : "../image/ss8.jpg","name":"斯里兰卡乳胶枕（波浪款）", "price":"RMB：399"},
                {"href":"#","img" : "../image/ss9.jpg", "name":"花鸟纯棉印花靠垫", "price":"RMB：99"},
                { "href":"#", "img" : "../image/ss10.jpg", "name":"麻棉绣花外缝鞋", "price":"RMB：79"}
            ];
            var html = template('new_temp_small',{ _model:_data});
            $(".new_con_small").append(html)


            /***** 轮播图 *****/
            new Carousel({
                imgs : [
                    {src:"../image/ban_1.jpg", href:"http://www.163.com"},
                    {src:"../image/ban_2.jpg", href:"http://www.sina.com.cn"},
                    {src:"../image/ban_3.jpg", href:"http://baike.baidu.com"},
                    {src:"../image/ban_4.jpg", href:"http://baike.baidu.com"}
                ],
                container : $("#banner_container"),
                width : 1200,
                height : 450
            });
            //删除上页、下页
            $(".prev").remove();
            $(".next").remove();

            /******** 精选话题 *******/
            function article() {
                var  attr_article = [
                    {},
                    {
                        word_pic:"../image/pic2.jpg",
                        head_src:"../image/head.jpg",
                        nick_name : "棉仔",
                        time : "2017-08-29",
                        place : "北京",
                        eye:1572,
                        zhan : 24,
                        chat : 10,
                        title : "朴素说03期：老郭和他的毛笔",
                        word : "书法丹青是他的工作，是他的乐趣，亦是他的生活，更是他的人生......"
                    },
                    {
                        word_pic:"../image/pic3.jpg",
                        head_src:"../image/head2.jpg",
                        nick_name : "唐瑾",
                        time : "2017-08-24",
                        place : "深圳",
                        eye:1565,
                        zhan : 11,
                        chat : 5,
                        title : "大朴代言人08月期：孩子便是我追求的动力...",
                        word : "我是全职妈妈，想跟你们分享一下我的世界与生活。"
                    }
                ];
                for( var i=0; i<attr_article.length;i++){
                    if( i===0){
                        $(".article_hide").clone(true)
                            .removeClass("article_hide")
                            .addClass("home_article_w").appendTo(".home_article");
                    }
                    else {
                        $(".article_hide").clone(true)
                            .removeClass("article_hide")
                            .addClass("home_article_w")
                            .find(".word_pic").attr({ src : attr_article[i].word_pic}).end()
                            .find(".head_pic").attr({ src : attr_article[i].head_src}).end()
                            .find(".col_1_r_1").text(attr_article[i].nick_name).end()
                            .find(".timer").text(attr_article[i].time).end()
                            .find(".place").text(attr_article[i].place).end()
                            .find(".eye").text(attr_article[i].eye).end()
                            .find(".zhan").text(attr_article[i].zhan).end()
                            .find(".chat").text(attr_article[i].chat).end()
                            .find(".word_title").text(attr_article[i].title).end()
                            .find(".article_word").text(attr_article[i].word).end()
                            .appendTo(".home_article");
                    }
                }
            }
            article();
        })
});
});
