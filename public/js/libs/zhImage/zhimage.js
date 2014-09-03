(function($){
	jQuery.fn.zuImage = function(obj) {
	    return this.each(function() {
	    	var stepNum,
	    		select_photo,
	    		progressUpdate = function(num) {
	    			if(num === 1 ){
	    				updateStyle.progress(1);
			           	$(".zu-select-photo").animate({
							'top': 46
			           	}, 600);
			           	progressUpdate(2);
			           	$(".zu-tool ul li:eq(0) span").removeClass('green');
	    			}else if(num === 2){
	    				updateStyle.progress(1);
	    				$(".zu-select-photo ul li").click(function(){
			           		select_photo = $(".zu-select-photo ul li").index($(this));
			           		$(".zu-select-photo").animate({
								'top': -100
				            }, 600, function(){
				            	progressUpdate(3);
				            });
			           	});
			           	$(".zu-tool ul li:eq(0) span").removeClass('green');
					}else if(num === 3 ){
						updateStyle.progress(2);
						$(".zu_roles").html('<img height="100%" src="'+$('.zu-select-photo ul li:eq('+select_photo+') img').attr('src')+'" />').draggable();
						$(".zu-tool ul li:eq(0) span").addClass('green');
					}else{
						updateStyle.progress(0);
						$(".zu-tool ul li:eq(0) span").removeClass('green');
					}
	    		},
	    		updateStyle = {
	    			progress: function(num) {
	    				stepNum = num;
	    				var zu_progress = $(".zu-progresstext ul li div");
	    				zu_progress.removeClass('current').eq(num).addClass('current');
	    			}
	    		}
	    	
	    	//workspace init
	    	$(this).css({
	    		'width': obj.width,
	    		'maxWidth': obj.maxwidth,
	    		'height': obj.height,
	    	}).html('<input name="upload_img" class="hidden" type="file" /><div class="zu_prompt1"><div class="zu_prompt_middle"><div class="zu_step1_prompt_text"></div><div class="zu_step1_prompt_img"></div></div></div><div class="zu_workspace"><div class="zu_step1_workspace_block"></div><div class="zu_step1_workspace_img"></div><div class="zu_roles"></div></div><div class="abs_2"><div class="zu-table"><div class="zu-table-row"><div class="zu-tool"><ul><li><span class="glyphicon glyphicon-camera gray"></span></li><li><span class="glyphicon glyphicon-picture green"></span></li></ul></div><div class="zu-progresstext"><ul><li><div class="step1"></div></li><li><div class="step2"></div></li><li><div class="step3"></div></li><li><div class="step4"></div></li></ul></div></div></div><div class="zu-select-photo"><ul></ul></div></div>');
			$.each(obj.photo, function( index, value ) {
				$(".zu-select-photo ul").append('<li><img width="100%" src="'+value+'" /></li>');
			});
	    	
	    	//progress init
	    	progressUpdate(0);

	    	//click trigger upload img event
	    	$(".zu_prompt1, .zu-tool ul li:eq(1)").click(function() {
	    		$("input[name='upload_img']").trigger('click');
	    		$(".zu_roles").empty();
	    	});

	    	//selected img , upload img
	    	$("input[name='upload_img']").change(function() {
	    		var fileInput = $(this)[0],
	    			file = fileInput.files[0],
	    			reader = new FileReader();
			    reader.onload = function(e) {
		           localStorage.theImage = reader.result;
		           $(".zu_step1_workspace_img").css('background', 'url('+reader.result+')');
		           $(".zu_prompt1").hide();
		           progressUpdate(1);
			    }
			    reader.readAsDataURL(file);
	    	});

	    	$(".zu-tool ul li:eq(0)").click(function(){
	    		if(stepNum === 2){
	    			updateStyle.progress(3);
	    			$(".zu-light").show().animate({
						'opacity': '0'
		            }, 800, function(){
		            	$(this).hide().css('opacity', '100');
		            	html2canvas($(".zu_workspace"), {
							onrendered: function(canvas) {
						    	$(".zuImage").empty().html('<div class="zu-end_opacity"></div><ul class="zu-end"><li><span class="glyphicon glyphicon-download-alt s58"></span></li><li><span class="glyphicon glyphicon-repeat s58"></span></li></ul><img src="'+canvas.toDataURL('image/jpeg')+'" />');
						    	$(".zu-end li:eq(0)").click(function(){
						    		var download = $("<a>").attr("href", canvas.toDataURL('image/jpeg')).attr("download", "withkp.jpg").appendTo("body");
							    	download[0].click();
							    	download.remove();
						    	});
						    	$(".zu-end li:eq(1)").click(function(){
						    		location.reload();
						    	});
						  	}
						});
		            });
	    		}else{
	    			return;
	    		}
	    	});

	    	//light init
	    	$("body").append('<div class="zu-light"></div>');
	    	$(".zu-light").css('height', $('body').height());

	    });
	};
})(jQuery);