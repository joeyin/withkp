(function($){
	
	var page_postion = [];

	function goPage(num){
		var body = $("html, body");
		body.animate({
			scrollTop: page_postion[num].top
		}, '500', 'swing');
	}

	function supports_html5_storage(){
	    try {
	        return true;
	    } catch(e) {
	        return false;
	    }
	}

	$(window).resize(function(){
		$(".page").css({
			'height': $(window).height()
		}).each(function(){
			page_postion.push($(this).offset());
		});
	});

	$(function(){
		
		if(!supports_html5_storage()){
			alert('您的瀏覽器無法正常使用此服務，請更換瀏覽器或將瀏覽器升級。');
		};
		$(".page").css({
			'height': $(window).height()
		}).each(function(){
			page_postion.push($(this).offset());
		});
		$(".zuImage").zuImage({
			'width': '100%',
			'maxwidth': '800px',
			'height': '568px',
			'photo': ['public/images/keyer_effects/kp1.png']
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