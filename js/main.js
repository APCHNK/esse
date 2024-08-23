let $selected = 0; //відкритий select в даний момент
const $icons = {
	error: '<svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10 9.00205L13.3403 5.687L14.0447 6.39678L10.7098 9.70649L14.0445 13.016L13.3401 13.7258L10 10.4109L6.65989 13.7258L5.95547 13.016L9.29019 9.70649L5.95525 6.39678L6.65967 5.687L10 9.00205Z" fill="#CC372E"/></svg>',

	success: '<svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99313 0C8.01561 0.0013591 6.08289 0.589005 4.4393 1.68864C2.79572 2.78829 1.51506 4.35055 0.759238 6.17793C0.00341552 8.00531 -0.193638 10.0158 0.19299 11.9551C0.579618 13.8945 1.53257 15.6757 2.93137 17.0735C4.33016 18.4713 6.11201 19.4231 8.05163 19.8084C9.99125 20.1936 12.0016 19.9952 13.8284 19.2381C15.6553 18.4811 17.2167 17.1993 18.3152 15.555C19.4137 13.9106 20 11.9775 20 10C19.9974 7.34745 18.942 4.80439 17.0657 2.9294C15.1895 1.05441 12.6457 0.00079966 9.99313 0ZM4.84891 9.73213L5.64559 8.93544L8.85987 12.1497L14.3475 6.65523L15.1442 7.45191L8.85987 13.7363L4.84891 9.73213Z" fill="#20A92E"/></svg>'
};

$(function() {
	'use strict';
	
	
	let $win_width = $(window).outerWidth(); //ширина вікна
	
	
	/* preLoader
	------------------------------------------------------- */
	$('#js-intro-section').imagesLoaded(function(){
		$('#page').removeClass('loading');
	});

	
	/* Слайдер на першому екрані
	------------------------------------------------------- */
	let $slide_animation = true;
	
	$('#js-next-slide').on('click', function(){
		if (! $slide_animation) {
			return false;
		}
		
		$slide_animation = false;
		
		let $next_slide_btn = $(this);
		let $current_slide = $('.js-slide').filter('.active');
		let $current_slide_id = $current_slide.data('id');
		let $next_slide = ($current_slide.next('.js-slide').length) ? $current_slide.next('.js-slide') : $('.js-slide').eq(0);
		let $next_slide_id = $next_slide.data('id');
		let $left = $('#js-next-slide').offset().left;
		
		$next_slide.removeAttr('style').addClass('active');
		$current_slide.css('z-index', 1);
		
		setTimeout(function(){
			$current_slide.removeClass('active').css('transform', 'translate('+ $left +'px, -50%)');
		}, 500);
		
		//наступний слайд після майбутнього слайда
		let $next_next_slide_id = parseInt($next_slide_id) + 1;
		
		if ($next_next_slide_id === 4) {
			$next_next_slide_id = 1;
		}
		
		//кнопка перемикання слайдів
		$next_slide_btn.find('.intro-next-slide-num').text('0'+ $next_next_slide_id);
		
		let $current_slide_bg = $next_slide_btn.find('.intro-next-slide-bg').filter('.active');
		let $next_slide_bg;
		
		if ($current_slide_bg.next('.intro-next-slide-bg').length) {
			$next_slide_bg = $current_slide_bg.next('.intro-next-slide-bg');
		} else {
			$next_slide_bg = $current_slide_bg.prev('.intro-next-slide-bg');
		}
			
		$current_slide_bg.addClass('prev');
		$next_slide_bg.addClass('active');
		
		setTimeout(function(){
			$current_slide_bg.removeClass('prev active').attr('src', 'img/slider/'+ $current_slide_id +'.jpg');
			$slide_animation = true;
		}, 500);
		
		//переваги
		$('.js-benefit').removeClass('active');
		$('#js-benefit' + $next_slide_id).addClass('active');
		
		return false;
    });
	
	
	if ($win_width <= 750) {
		setInterval(function(){
			$('#js-next-slide').trigger('click');
		}, 5000);
	}
	
	
	sliderIntro();
	
	
	function sliderIntro() {
		let $left = $('#js-next-slide').offset().left;
		
		$('.js-slide').each(function(){
			let $slide = $(this);
			
			if (! $slide.hasClass('active')) {
				$slide.css('transform', 'translate('+ $left +'px, -50%)');
			}
		});
	}
	
	
	/* Кнопка меню
	------------------------------------------------------- */
	$(document).on('scroll', function() {
		fixedMenuButton($(this).scrollTop());
    });
	
	fixedMenuButton($(document).scrollTop());
	
	
	/* Навігація по сторінці
	------------------------------------------------------- */
	$('.js-get-section').on('click', function(){
        let $scroll = $($(this).data('section')).offset().top;
        $('html, body').animate({
            scrollTop: $scroll
        }, 500);
		$('#js-menu').removeClass('open');
		$('#page').removeClass('form-open');
		return false;
    });
	
	
	/* Ефект при наведенні на пункти меню
	------------------------------------------------------- */
	$('.menu-nav-link').on('mouseenter', function(){
		let $link = $(this);
		let $item = $link.parents('.menu-nav-item');
		let $target = $('#js-target-link');
		
		if (! $item.hasClass('active')) {
			$('.menu-nav-item').removeClass('active');
			$item.addClass('active');
			
			setTimeout(function(){
				let $top = $link.offset().top;
				let $left = $link.offset().left;

				$target.css({
					left: $left,
					top: $top
				});
			}, 200);
		}
    });
	
	
	$('#js-menu').on('scroll', function() {
		let $item = $('.menu-nav-item').filter('.active').eq(0);
		let $link = $item.find('.menu-nav-link');
		let $target = $('#js-target-link');
		
		setTimeout(function(){
			let $top = $link.offset().top;
			let $left = $link.offset().left;

			$target.css({
				left: $left,
				top: $top
			});
		}, 300);
    });
	
	
	function targetPosition() {
		let $item = $('.menu-nav-item').eq(1);
		let $link = $item.find('.menu-nav-link');
		let $target = $('#js-target-link');
		
		$('.menu-nav-item').removeClass('active');
		$item.addClass('active');
		
		setTimeout(function(){
			let $top = $link.offset().top;
			let $left = $link.offset().left;

			$target.css({
				left: $left,
				top: $top
			});
		}, 300);
	}
	
	
	/* Відкрити модальне вікно
	------------------------------------------------------- */
	$('.js-open-modal').on('click', function(){
		let $modal = $($(this).data('modalId'));
		openModalWindow($modal);
		return false;
	});
	
	
	/* Закрити модальне вікно
	------------------------------------------------------- */
	$('.js-close').on('click', function(){
		let $modal = $($(this).data('modalId'));
		closeModalWindow($modal); //закриваємо модальне вікно
		return false;
	});
	
	
	/* Закрити модальне вікно при клику за межами його зони
	------------------------------------------------------- */
	$(function(){	
		$(document).on('click touchstart', function(event) {
			if ($('.js-modal').is(':visible')) {
				if ($(event.target).closest('.js-modal').length) { return; }
				if ($(event.target).closest('iframe').length) { return; }
				closeModalWindow($('.modal-box:visible')); //закриваємо модальне вікно
				event.stopPropagation();
			}
		});
	});
	
	
	/* Відправка форми
	------------------------------------------------------- */	
	$('#js-send').on('click', function(){
		checkFields($('#js-form')); //перевірка полів форми на введені дані
		return false;
	});
	
	
	/* Відправка форми в модальному вікні
	------------------------------------------------------- */
	let $seconds = 9; //секунд до закриття модального вікна
	let $timer; //ID таймера закриття модального вікна
	
	$('#js-send-modal').on('click', function(){
		let $verification = checkFields($('#js-form-modal')); //перевірка полів форми на введені дані
		let $modal = $('#js-modal-callback');
		
		if (! $verification) {
			return false;
		}
		
		$modal.removeClass('slideInDown').addClass('slideOutUp');

		setTimeout(function() {
			$modal.hide();
			$('#js-modal-thank').show().removeClass('slideOutUp').addClass('slideInDown');
			
			$seconds = 9;
			$('#js-timer').text($seconds);
			clearTimeout($timer);
			
			//таймер закриття модального вікна
			$timer = setInterval(function(){
				timer($seconds);
			}, 1000);
			
		}, 300);
		
		
		return false;
	});
	
	
	/* Таймер закриття модального вікна
	------------------------------------------------------- */
	function timer($s) {
		$s--;
		$seconds = $s;
		$('#js-timer').text($s);
		
		if ($s === 0) {
			let $modal = $('#js-modal-thank');
			closeModalWindow($modal); //закрываем модальное окно
			clearTimeout($timer);
		}
	}
	
	
	/* Скидання значень полів форми
	------------------------------------------------------- */
	resetInput();
	
	
	/* Лічильник введених символів в textarea
	------------------------------------------------------- */
	$('#js-message').keyup(function(){
		lengthCharactersInput($(this), $('#js-counter'));
	});
	
	
	$('#js-message-modal').keyup(function(){
		lengthCharactersInput($(this), $('#js-counter-modal'));
	});
	
	
	/* Випадаючі списки
	------------------------------------------------------- */
	$('.js-open-form-select').on('click', function(){
		let $this = $(this);
		$('.js-form-select').hide();
		$selected = $this; //открытый select в данный момент
		$selected.next('.js-form-select').show();
		return false;
	});
	

	$(function(){
		$(document).on('click touchstart', function(event) {
			if ($('.js-form-select').is(':visible')) {
				if ($(event.target).closest('.js-form-select').length) { return; }
				$('.js-form-select').hide();
				event.stopPropagation();
			}
		});
	});
	
	
	/* Меню
	------------------------------------------------------- */
	$('#js-menu-open').click(function () {
		$('#js-menu').addClass('open');
		$('#page').addClass('form-open');
		targetPosition();
		return false;
	});
	
	
	$('#js-menu-close').click(function () {
		$('#js-menu').removeClass('open');
		$('#page').removeClass('form-open');
		return false;
	});
	
	
	$(function(){
		$(document).on('click touchstart', function(event) {
			if ($('#js-menu').hasClass('open')) {
				if ($(event.target).closest('#js-menu').length) { return; }
				$('#js-menu').removeClass('open');
				$('#page').removeClass('form-open');
				event.stopPropagation();
			}
		});
	});
	
	
	/* Галерея локацій
	------------------------------------------------------- */
	createLightGallery();
	
	function createLightGallery() {
		$('#portfolio_horizontal_container').lightGallery({
			selector: '.locations-gallery-item',
			download: false,
			nextHtml: '<svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21L11 11L0.999999 1" stroke="white" stroke-width="2"/></svg>',
			prevHtml: '<svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21L2 11L12 1" stroke="white" stroke-width="2"/></svg>',
			appendCounterTo: '.modal-gallery-toolbar-right',
			thumbWidth: 150,
			thumbMargin: 10
		});
	}
	

	/* Слайдер локацій
	------------------------------------------------------- */
	let $slider_gallery = $('#js-gallery').owlCarousel({
		loop: true,
		items: 1,
		autoWidth: true,
		dots: false
	});
	
	
	$slider_gallery.on('changed.owl.carousel', function(event) {
		if ($('#js-gallery').data('lightGallery')) {
			$('#js-gallery').data('lightGallery').destroy(true);
			createLightGallery();
		}
	});
	
	
	/* Навігація по тегам
	------------------------------------------------------- */
     function inithorizontalPortfolio() {
         if ($("#portfolio_horizontal_container").length) {
             var d = $("#portfolio_horizontal_container");
             d.imagesLoaded(function(a, b, e) {
                 var f = {
                     itemSelector: ".locations-gallery-slide",
                     layoutMode: "packery",
                     packery: {
                         isHorizontal: true,
                         gutter: 0
                     },
                     resizable: true,
                     transformsEnabled: true,
                     transitionDuration: "700ms"
                 };
                 var g = {
                     itemSelector: ".locations-gallery-slide",
                     layoutMode: "packery",
                     packery: {
                         isHorizontal: false,
                         gutter: 0
                     },
                     resizable: true,
                     transformsEnabled: true,
                     transitionDuration: "700ms"
                 };

				 d.isotope(f);
				 d.isotope("layout");
				 $(".horizontal-grid-wrap").niceScroll({
					 cursorwidth: "6px",
					 cursorborder: "none",
					 cursorborderradius: "0px",
					 touchbehavior: true,
					 autohidemode: false,
					 cursorcolor: "#292929",
					 bouncescroll: false,
					 scrollspeed: 120,
					 mousescrollstep: 90,
					 grabcursorenabled: true,
					 horizrailenabled: true,
					 preservenativescrolling: true,
					 cursordragontouch: false,
					 railpadding: {
						 top: -20,
						 right: 0,
						 left: 0,
						 bottom: 0
					 }
				 });
                 $("a.js-tag").on("click", function(e) {
                     e.preventDefault();
                     var b = $(this).attr("data-filter");
                     d.isotope({
                         filter: b
                     });
                     $(".locations-tags a").removeClass("active");
                     $(this).addClass("active");
					 return false;
                 });
             });
         }
     }
     inithorizontalPortfolio();
	 
	$(window).on("resize", function() {
         inithorizontalPortfolio();
		 createLightGallery();
     });
	
	
	/* Вибір локацій із списку
	------------------------------------------------------- */
	$('.js-option').on('click', function(){
		let $option = $(this);
		let	$value = $option.data('value');
		
		$('.js-form-select').hide();
		$selected.children('span').text($option.text());
		$('.locations-gallery-item').addClass('hidden');

		$('.locations-gallery-item').each(function(){
			let $this = $(this);
			let $str = $this.data('tags');

			if ($str.indexOf($value) + 1) {
				$this.removeClass('hidden');
			}
		});
		
		return false;
	});
	

	/* Перемикач табів (кейсів)
	------------------------------------------------------- */
	$('.js-switch').on('click', function(){
		let $this = $(this);
		let	$tab = $this.data('tab');
		
		$('.js-switch').removeClass('active');
		$this.addClass('active');
		
		$('.js-tab').removeClass('active');
		$('#js-tab'+ $tab).addClass('active');
		
		$('.js-cases-dots').removeClass('active');
		$('#js-cases-dots'+ $tab).addClass('active');
		return false;
	});
	
	
	/* Відкрити модальне вікно відео
	------------------------------------------------------- */
	$('.js-open-video').on('click', function(){
		let $video_id = $(this).data('videoId');
		let $modal = $('#js-modal-video');
		let $iframe = '<iframe src="https://player.vimeo.com/video/'+ $video_id +'?autoplay=1" allow="autoplay; fullscreen" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
		
		$('#js-video').html($iframe);
		
		$modal.show().removeClass('slideOutUp').addClass('slideInDown');
		$('#page').addClass('form-open');
		return false;
	});
	
	
	/* Запустити відео
	------------------------------------------------------- */
	$('#js-play-video').on('click', function(){
		let $this = $(this);
		let $video_id = $this.data('videoId');
		let $iframe = '<iframe src="https://player.vimeo.com/video/'+ $video_id +'?autoplay=1" allow="autoplay; fullscreen" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
		
		$this.addClass('launched').find('.js-player').html($iframe);
		return false;
	});
	
	
	/* Слайдери кейсів
	------------------------------------------------------- */
	$('.js-tab').each(function(){
		let $this = $(this);
		let $id = $this.data('id');
		
		$this.find('.js-cases-slider').owlCarousel({
			loop: true,
			items: 1,
			autoWidth: true,
			dots: false,
			dotsContainer: $('#js-cases-dots'+ $id),
			responsive : {
				750 : {
					dots: true
				},
				1280 :{
					items: 4,
					autoWidth: false,
					margin:20,
					dots: true
				}
				
			}
		});
	});
	
	
	/* Слайдер перемикачів кейсів
	------------------------------------------------------- */
	$('#js-cases-switch').owlCarousel({
		items: 1,
		autoWidth: true,
		dots: false
	});
	
	
	/* Слайдер нагород
	------------------------------------------------------- */
	$('#js-awards-slider').owlCarousel({
		loop: true,
		items: 1,
		autoWidth: true,
		margin: 20,
		dots: false,
		responsive : {
			1280 :{
				items: 4,
				autoWidth: false,
				margin:20
			}
		}
	});
	
	
	/* Слайдер команди
	------------------------------------------------------- */
	$('#js-team-slider').sly({
		horizontal: 1,
		itemNav: 'basic',
		smart: 1,
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		scrollBar: $('#js-team-scrollbar'),
		scrollBy: 1,
		speed: 300,
		elasticBounds: 1,
		easing: 'easeOutExpo',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
	});
	
	
	/* Слайдер відгуків клієнтів
	------------------------------------------------------- */
	if ($win_width <= 1024) {
		let $feedback_slide = $('.feedback-slider-item').filter('.active');
		let $clone = $feedback_slide.clone();
		let $slide_active_container = $('#js-feedback-slide-active');
		
		$('.feedback-slider-item').wrapAll('<div class="feedback-slider-container"></div>');
		$slide_active_container.html($clone);
		$feedback_slide.removeClass('active');
		
		if ($win_width <= 480) {
			$('#js-feedback-scrollbar').removeClass('scrollbar-v').addClass('scrollbar');
		}
		
		setTimeout(function(){
			if ($win_width > 480) {
				let $height = $slide_active_container.outerHeight();
				$('.feedback-wrap-slider').height($height);
			}
			
			$('#js-feedback-slider').sly({
				horizontal: ($win_width <= 480) ? 1 : false,
				itemNav: 'basic',
				smart: 1,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				scrollBar: $('#js-feedback-scrollbar'),
				scrollBy: 1,
				speed: 300,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
			});
		}, 100);
		
	} else {
		$('#js-feedback-slider').addClass('owl-carousel').owlCarousel({
			loop: true,
			items: 1,
			autoWidth: true,
			dotsContainer: $('#js-feedback-dots')
		});
	}
	
	
	/* Перемикач відгуків клієнтів
	------------------------------------------------------- */
	$('#page').on('click', '.js-feedback', function(){
		let $this = $(this);
		
		if ($win_width <= 1024) {
			let $clone = $this.clone();
			$clone.addClass('active');
			$('#js-feedback-slide-active').html($clone);
		} else {
			$('.js-feedback').removeClass('active');
			$this.addClass('active');
		}
		
		return false;
    });
	
	
	/* Анимация появления блоков
	------------------------------------------------------- */
	let wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true,
		scrollContainer: null
	});
	wow.init();
	
	
});


/* Фіксація кнопки меню
------------------------------------------------------- */
function fixedMenuButton($scroll) {
	'use strict';

	let $height = $('#js-intro-section').outerHeight();

	if($scroll > $height) {
		$('#js-menu-open').addClass('fixed');
	} else {
		$('#js-menu-open').removeClass('fixed');
	}
}


/* Відкрити модальне вікно
------------------------------------------------------- */
function openModalWindow($modal) {
	'use strict';
	
	$modal.show().removeClass('slideOutUp').addClass('slideInDown');
	$('#page').addClass('form-open');
}


/* Закрити модальне вікно
------------------------------------------------------- */
function closeModalWindow($modal) {
	'use strict';
	$('#js-video').html('');
	$('#js-play-video').removeClass('launched').find('.js-player').html('');
	$modal.removeClass('slideInDown').addClass('slideOutUp');
	$('#page').removeClass('form-open');
	
	setTimeout(function() {
		$modal.hide();
	}, 300);
}


/* Перевірка полів форми на введені дані
------------------------------------------------------- */
function checkFields($form) {
	'use strict';
	
	let $verification = true;
	
	$form.find('.input-icon').each(function(){
		$(this).remove();
	});

	$form.find('.input-field').each(function(){
		let $error = false;
		let $input = $(this);
		let $input_val = $input.val();

		if ($input_val === '') {
			$input.after($icons.error);
			$error = true;
		}

		if ($input.hasClass('js-email')) {

			let $pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

			if(! $pattern.test($input_val)) {
				$input.after($icons.error);
				$error = true;
			}
		}

		if (! $error) {
			$input.after($icons.success);
		} else {
			$verification = false;
		}
	});
	
	return $verification;
}


/* Лічильник введених символів в textarea
------------------------------------------------------- */
function lengthCharactersInput($field, $counter) {
	'use strict';	
	let $input = $field;
	let $input_val = $input.val();
	let $count = $input_val.length; //кількість вже введених символів
	let $max = 200;

	if ($count > $max) {
		$input_val = $input_val.substr(0, $max);
		$input.val($input_val);
		$count = $max;
	}

	$counter.text($count);
}


/* Скидання значень полів форми
------------------------------------------------------- */
function resetInput() {
	'use strict';

	$('.input-field').each(function(){
		$(this).val('');
	});
}


google.maps.event.addDomListener(window, 'load', init);

function init() {
    let mapOptions = {
        zoom: 14,
        zoomControl: false,
        scrollwheel: false,
        scaleControl: false,
        rotateControl: false,
        panControl: false,
        mapMaker: false,
        disableDefaultUI: false,
        streetViewControl: false,
        signInControl: false,
        mapTypeControl: false,
        center: new google.maps.LatLng(50.4396819, 30.5006235)      
    };

    let mapElement = document.getElementById('js-map');
    let map = new google.maps.Map(mapElement, mapOptions);
	
	
	new google.maps.Marker({
		position: new google.maps.LatLng(50.4396819, 30.5006235),
		map: map,
		title: '70A Saksahanskoho str., Kiev, Ukraine, 01032',
		icon: '/img/map-pin.png'
	});
	

    // Enable scroll zoom after click on map
    map.addListener('click', function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Enable scroll zoom after drag on map
    map.addListener('drag', function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Disable scroll zoom when mouse leave map
    map.addListener('mouseout', function() {
       map.setOptions({
           scrollwheel: false
       });
    });
}
