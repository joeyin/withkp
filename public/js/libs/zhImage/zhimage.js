(function($){
	
	"use strict";
	
	jQuery.fn.zuImage = function(obj) {

    	var $this = $(this),
    		$window = $(window),
    		stepNum = 0,
    		select_photo = null,
    		takephoto_msg = null,
    		zu_prompt1 = null,
    		progressUpdate = function(num) {
    			var takephoto = $(".zu-tool ul li:eq(0) span");
    			if(num === 1 ){
    				updateStyle.progress(1);
		           	$(".zu-select-photo").show().animate({
						'top': 50
		           	}, 600);
		           	progressUpdate(2);
		           	takephoto.removeClass('current_light');
		           	takephoto_msg.add(zu_prompt1).removeClass('show');
    			}else if(num === 2){
    				updateStyle.progress(1);
    				$(".zu-select-photo ul li").click(function(){
		           		select_photo = $(".zu-select-photo ul li").index($(this));
		           		$(".zu-select-photo").animate({
							'top': -100
			            }, 600, function(){
			            	$(this).hide();
			            	progressUpdate(3);
			            });
		           	});
		           	takephoto.removeClass('current_light');
		           	takephoto_msg.add(zu_prompt1).removeClass('show');
				}else if(num === 3 ){
					takephoto_msg.addClass('show');
					updateStyle.progress(2);
					var image_src = $('.zu-select-photo ul li:eq('+select_photo+')').css('backgroundImage').replace('url(','').replace(')','').replace('"','');
					$(".zu_roles").html('<img width="80%" src="'+image_src+'" />').draggable({'cursor': 'move', 'scroll': false });
					$(".zu_roles img").resizable({ handles: "n, e, s, w" });
					takephoto.addClass('current_light');
					zu_prompt1.removeClass('show');
				}else{
					updateStyle.progress(0);
					takephoto.removeClass('current_light');
					takephoto_msg.removeClass('show');
					$(".zu_step1_workspace_img").css('backgroundImage', '');
					takephoto.removeClass('current_light');
		           	takephoto_msg.removeClass('show');
		           	zu_prompt1.addClass('show');
		           	$(".zu_roles").empty();
				}
    		},
    		updateStyle = {
    			progress: function(num) {
    				stepNum = num;
    				var zu_progress = $(".zu-progresstext ul li div");
    				zu_progress.removeClass('current').eq(num).addClass('current');
    			}
    		},
    		initWorkSpace = function(){
    			$("body").append('<div class="zu-light"></div>');
	    		$(".zu-light").css('height', $('body').height());
    			$this.css({
		    		'width': obj.width,
		    		'maxWidth': obj.maxwidth,
		    		'height': obj.height,
		    	}).html('<input name="upload_img" class="hidden" type="file" /><div class="zu_prompt1"><div class="zu_prompt_middle"><div class="zu_step1_prompt_text"></div><div class="zu_step1_prompt_img"></div></div></div><div class="zu_workspace"><div class="zu_step1_workspace_block"></div><div class="zu_step1_workspace_img"></div><div class="zu_roles"></div></div><div class="abs_2"><div class="takephoto_msg">立即合照</div><div class="zu-table"><div class="zu-table-row"><div class="zu-tool"><ul><li><span class="glyphicon glyphicon-camera gray s20"></span></li><li><span class="glyphicon glyphicon-picture green s20"></span></li></ul></div><div class="zu-progresstext"><ul><li><div class="step1"></div></li><li><div class="step2"></div></li><li><div class="step3"></div></li><li><div class="step4"></div></li></ul></div></div></div><div class="zu-select-photo"><ul></ul></div></div>');
				$.each(obj.photo, function( index, value ) {
					$(".zu-select-photo ul").append('<li style="background:url('+value+') bottom center no-repeat;background-size:100%;"></li>');
				});
				$(".zu_prompt1, .zu-tool ul li:eq(1)").click(function() {
		    		$("input[name='upload_img']").trigger('click');
		    		if($(".zu-select-photo").is(':visible')){
		           		$(".zu-select-photo").animate({
							'top': -100
			            }, 600, function(){
			            	$(this).hide();
			            });
		    		}
		    	});
		    	$("input[name='upload_img']").change(function() {
		    		if($(this).val()){
		    			var fileInput = $(this)[0],
			    			file = fileInput.files[0],
			    			reader = new FileReader();
					    reader.onload = function(e) {
							try {
								localStorage.theImage = reader.result;
					           	$(".zu_step1_workspace_img").css('background', 'url('+reader.result+')');
					           	$(".zu_prompt1").hide();
					           	progressUpdate(1);
				           	}catch(e){
				           		alert('發生錯誤： '+e);
				           	}
					    }
					    reader.readAsDataURL(file);
		    		}else{
		    			progressUpdate(0);
		    		}
		    	});
		    	takephoto_msg = $(".takephoto_msg");
		    	zu_prompt1 = $(".zu_prompt1");
		    	$(".zu-tool ul li:eq(0), .step4").add(takephoto_msg).click(function(){
		    		if(stepNum === 2){
		    			$(".ui-resizable-handle").hide();
		    			updateStyle.progress(3);
		    			$(".zu-light").show().animate({
							'opacity': '0'
			            }, 800, function(){
			            	$(this).hide().css('opacity', '100');
			            	html2canvas($(".zu_workspace"), {
								onrendered: function(canvas) {
							    	try{
							    		$(".menu li a:eq(1)").click();
								    	$(".zuImage").empty().html('<div class="zu-end_opacity"></div><ul class="zu-end"><li><span class="glyphicon glyphicon-download-alt s58"></span></li><li><span class="glyphicon glyphicon-repeat s58"></span></li></ul><img src="'+canvas.toDataURL('image/jpeg')+'" />');
								    	$(".zu-end li:eq(0)").click(function(){
								    		var download = $("<a>").attr({'target': '_blank', 'href': canvas.toDataURL('image/jpeg'),'download': 'withkp.jpg'}).appendTo("body");
									    	download[0].click();
									    	download.remove();
								    	});
								    	$(".zu-end li:eq(1)").click(function(){
								    		location.reload();
								    	});	
							    	}catch(e){
							    		alert(e);
							    	}
							  	}
							});
			            });
		    		}else{
		    			return;
		    		}
		    	});
				progressUpdate(0);
    		};

    	$window.on('load', initWorkSpace);

	}

})(jQuery, this);