$(document).ready(function () {
    /*모바일 높이*/
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    $(window).resize(function () {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    });

    new WOW().init();

    $('select').niceSelect()

    $(".top_btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $('.bg_text_box.move .bg_text').marquee({
        speed: 150,
        gap: 30,
        delayBeforeStart: -5000,
        direction: 'left',
        duplicated: true,
        pauseOnHover: false,
    });

    $(".sub_visual .img").addClass("zoom");

    $(".accordion li").click(function () {

        $(this).find(".answer").stop().slideToggle();
        $(this).toggleClass('on');
        $(this).siblings("li").find(".answer").slideUp();
        $(this).siblings("li").removeClass('on');
    })

    var scrollingElement = document.scrollingElement;
    var scrollWidth = window.innerWidth - scrollingElement.clientWidth
    var root = document.querySelector(':root');
    let styles = getComputedStyle(root);
    styles.getPropertyValue('--scroll-width');
    root.style.setProperty('--scroll-width', scrollWidth+'px');

});
