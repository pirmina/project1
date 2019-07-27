$(document).ready( function() {
	var topBanner = new Swiper('.top-banner', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		centeredSlides: true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false
	});

	var mainContent = new Swiper('.main-content', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });

	var mainContent = new Swiper('.format-content', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});

	var contactAbout = new Swiper('.contact-about h3 + .contact-about-con .swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		slidesPerView: 3,
		paginationClickable: true,
		spaceBetween: 0,
		freeMode: true,
		limitRotation: true
	});

		  var mySwiper = new Swiper('ie7 .main-content',{
    pagination: '.pagination',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.swiper-button-prev').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.swiper-button-next').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
	})

	$(function() {
		$(window).resize(function(){
			if($(window).width() <= 1024) {
				$('#contents .main').addClass('m-main');
				$(".top-banner img").each(function() {
				if($(this).attr("src").indexOf('_m.jpg') > -1) return false;
				var img = $(this).attr("src").replace('.jpg',"_m.jpg");
				$(this).attr("src", img);
			});
			}else{
				$(".top-banner img").each(function() {
					var img = $(this).attr("src").replace('_m.jpg',".jpg");
					$(this).attr("src", img);
				});
				$('#contents .main').removeClass('m-main');
			}
		}).resize();
	}) 


/*
	$(function() {
		if($(window).width() <= 1024) {
			$('#contents .main').addClass('m-main');
			$(".top-banner img").each(function() {
				$(this).attr("src", $(this).attr("src").replace("./images/", "./images/m_"));
			});
		}else{
			$('#contents .main').removeClass('m-main');
		}
	});
*/

});