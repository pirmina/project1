/*
ui/ux 테스트스크립트입니다.
*/
$(document).ready(function(){
    //lang_select
    $('.lang_select').on('click', function(){
        $(this).toggleClass('active')
    });
    $('.lang_select ul li').on('click', function() {
        var v = $(this).text().slice(3);	//.pc 텍스트 3음절 자름
    $('.lang_select ul li').not($(this)).removeClass('active');
        $(this).addClass('active');
        $('.lang_select label button').text(v)
    });
});

//컨텐츠 높이 최소값 계산
$(function(){
    var docHeight = $(window).innerHeight();
    var mobileminH = docHeight - 77;
    var pcminH = docHeight - 148;
    $(window).load(function(){
        var docWidth = document.width;
        measerWidth(docWidth);
    });
    $(window).resize(function(){
        var docWidth = document.width;
        measerWidth(docWidth);
    });
    function measerWidth(val){
        if(val >= 1245){
              $("#contents").css({ minHeight: mobileminH + 'px' });
        }else{
              $("#contents").css({ minHeight: pcminH + 'px' });
        }
    }
});
