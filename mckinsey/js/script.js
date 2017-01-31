$(document).ready(function() {

	$(function () {
		var pull = $('#pull'),
			menu = $('.menu');

		$(pull).on('click', function (e) {
			e.preventDefault();
			menu.slideToggle(150);
			$('body').toggleClass('open');
		});

		$(window).resize(function () {
			var w = $(window).width();
			if (w > 767 && menu.is(':hidden')) {
				menu.removeAttr('style');
			}
		});
	});

	// Небесные тела и сутки
	var now = new Date(Date.now()),
		current = now.getHours() * 60 + now.getMinutes(),
		sunrise = 480,
		sunset = 1320,
		moonBegin = 1321,
		$cosmic = $('.cosmic');
	if(current <= sunset && current >= sunrise) {
		$cosmic.animate({ textIndent: (current - sunrise) / 4.7 }, {
			step: function(goCoords, fx) {
				$(this).css({'transform': 'rotate('+goCoords+'deg)'});
			},
			duration: 1
		},'linear');
		/**
		 *
		 Объект движется на странице все все все время.
		setTimeout(function(){
			$cosmic.animate({ textIndent: 180 }, {
				step: function(orbit, fx) {
					$(this).css({'transform': 'rotate('+orbit+'deg)'});
				},
				duration: (sunset - current) * 60 * 1000
			},'linear');
		}, 1);
		 */
	} else if(current >= moonBegin && current <= 1439) {
		$('body').addClass('night');
		$cosmic.animate({ textIndent: current / 100 }, {
			step: function(goCoords, fx) {
				$(this).css({'transform': 'rotate('+goCoords+'deg)'});
				$('.moon').css({'transform': 'rotate(-'+goCoords+'deg)'});
			},
			duration: 1
		},'linear');
		/**
		 *
		 Объект движется на странице все все все время.
		setTimeout(function(){
			$cosmic.animate({ textIndent: 180 }, {
				step: function(orbit, fx) {
					$(this).css({'transform': 'rotate('+orbit+'deg)'});
				},
				duration: (600 - current / 100) * 60 * 1000
			},'linear');
		}, 1);
		 */
	} else if(current >= 0 && current < sunrise && current < sunset) {
		$('body').addClass('night');
		$cosmic.animate({ textIndent: current / 2.9 + 15 }, {
			step: function(goCoords, fx) {
				$(this).css({'transform': 'rotate('+goCoords+'deg)'});
				$('.moon').css({'transform': 'rotate(-'+goCoords+'deg)'});
			},
			duration: 1
		},'linear');
		/**
		 *
		 Объект движется на странице все все все время.
		setTimeout(function(){
			$cosmic.animate({ textIndent: 180 }, {
				step: function(orbit, fx) {
					$(this).css({'transform': 'rotate('+orbit+'deg)'});
				},
				duration: (600 - current / 100) * 60 * 1000
			},'linear');
		}, 1);
		 */
	}
	$('.tabsTriggers').on('click', 'li:not(.current)', function() {
		$(this)
			.addClass('current').siblings().removeClass('current')
			.closest('.tabs').find('.tab').removeClass('current').eq($(this).index()).addClass('current');

		return false;
	});
	$('ul.stageList').on('click', 'li:not(.current)', function() {
		$(this)
			.addClass('current').siblings().removeClass('current')
			.closest('div.container-fluid').find('div.stageTab').removeClass('current').eq($(this).index()).addClass('current');
	});
	$('.modalLoginTabTriggers').on('click', 'a:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.modal').find('div.modalTab').removeClass('active').eq($(this).index()).addClass('active');
	});

	$('.slide-next').on('click', function(){
		var slideCount = $('.slide').length,
			slideCurrent = $('.slide.current').index();
		if(slideCurrent <= slideCount) {
			$('.slide.current').removeClass('current').next('.slide').addClass('current');
		}
	});
	$('.slide-prev').on('click', function(){
		var slideCount = $('.slide').length,
			slideCurrent = $('.slide.current').index();
		if(slideCurrent <= 2) {

		} else {
			$('.slide.current').removeClass('current').prev('.slide').addClass('current');
		}
	});
	$('[data-modal]').on('click', function(){
		var $modal = $(this).data('modal');
		$($modal).arcticmodal();
		return false;
	});


	//
	$('.js-tbs').on('click', function () {
		var $block = $(this).parents('.teamBlock');
		if($block.hasClass('active')) {
			$block.removeClass('active');
			$block.find('.teamBlockContent').hide();
			$block.find('.teamBlockCall').hide();
			$block.find('.teamBlockShow').show();
		} else {
			$block.show().addClass('active');
			$block.find('.teamBlockContent').show();
			$block.find('.teamBlockCall').show();
			$block.find('.teamBlockShow').hide();
		}
		return false;
	});

});