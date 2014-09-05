(function($){
	
	var page = $(".page"),
		page_postion = [],
		goPage = function(num){
			var body = $("html, body");
			body.animate({
				scrollTop: page_postion[num].top
			}, '500', 'swing');
		};

	$(window).resize(function(){
		page_postion = [];
		page.css({
			'height': $(window).height()
		}).each(function(){
			page_postion.push($(this).offset());
		});
	});

	$(function(){
		page_postion = [];
		page.css({
			'height': $(window).height()
		}).each(function(){
			page_postion.push($(this).offset());
		});
		$(".zuImage").zuImage({
			'width': '100%',
			'maxwidth': '800px',
			'height': '568px',
			'photo': [
				'public/images/keyer_effects/kp1.png', 
				'public/images/keyer_effects/kp2.png', 
				'public/images/keyer_effects/kp3.png',
				'public/images/keyer_effects/kp4.png'
			]
		});
		$(".logo_medium").click(function(){
			goPage(0);
		});
		$(".menu li a").click(function(e){
			if( $(this).attr('target') != '_blank' ){
				e.preventDefault();
				var page_num = $(".menu li a").index($(this));
				goPage(page_num);
			}
		});
	});

})(jQuery);