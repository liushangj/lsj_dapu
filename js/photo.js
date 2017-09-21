/**
 * Created by qianfeng on 2017/9/21.
 */
require(["config"],function () {
    require(["jquery","template","cookie","load","carousel" , "swiper"],function ($,template){

        $(function () {
            var galleryTop = new Swiper('.gallery-top', {
                effct : 'fade',
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            });
            galleryTop.controller.control = galleryThumbs;
            galleryThumbs.controller.control = galleryTop;
        });

    });
});