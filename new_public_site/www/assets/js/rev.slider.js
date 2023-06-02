var dzrevapi;
var dzQuery =jQuery;
function dz_rev_slider_1(){
	if(dzQuery("#rev_slider_151_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_151_1");
	}else{
		dzrevapi = dzQuery("#rev_slider_151_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"src/assets/plugins/revolution/revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "vertical",
				mouseScrollNavigation:"off",
				mouseScrollReverse:"default",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				}
				,
				arrows: {
					style:"uranus",
					enable:true,
					hide_onmobile:false,
					hide_over:479,
					hide_onleave:false,
					tmp:'',
					left: {
						h_align:"left",
						v_align:"center",
						h_offset:0,
						v_offset:0
					},
					right: {
						h_align:"right",
						v_align:"center",
						h_offset:0,
						v_offset:0
					}
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			scrolleffect: {
				blur:"on",
				maxblur:"20",
				direction:"top",
				on_slidebg:"on",
				multiplicator:"2",
				multiplicator_layers:"2",
				tilt:"10",
				disable_on_mobile:"off",
			},
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:400,
				levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
			},
			shadow:0,
			spinner:"spinner3",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: ".header",
			fullScreenOffset: "0",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}
}
function dz_rev_slider_2(){
	if(dzQuery("#rev_slider_1077_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_1077_1");
	}else{
		dzrevapi = dzQuery("#rev_slider_1077_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"src/assets/plugins/revolution/revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
				mouseScrollReverse:"default",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				}
				,
				bullets: {
					enable:true,
					hide_onmobile:true,
					hide_under:960,
					style:"zeus",
					hide_onleave:false,
					direction:"horizontal",
					h_align:"right",
					v_align:"bottom",
					h_offset:80,
					v_offset:50,
					space:5,
					tmp:'<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			parallax: {
				type:"mouse",
				origo:"slidercenter",
				speed:2000,
				levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
				type:"mouse",
				disable_onmobile:"on"
			},
			shadow:0,
			spinner:"off",
			stopLoop:"on",
			stopAfterLoops:0,
			stopAtSlide:1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: ".site-header",
			fullScreenOffset: "0px",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
		var newCall = new Object(),
		cslide;

		newCall.callback = function() { 
		var proc = revapi1077.revgetparallaxproc(),
		fade = 1+proc,
		scale = 1+(Math.abs(proc)/10);

		punchgs.TweenLite.set(revapi1077.find('.slotholder, .rs-background-video-layer'),{opacity:fade,scale:scale});		
		}
		newCall.inmodule = "parallax";
		newCall.atposition = "start";

		/*revapi1077.bind("revolution.slide.onloaded",function (e) {
		revapi1077.revaddcallback(newCall);
		});*/				
	}
}
function dz_rev_slider_3(){
	if(dzQuery("#rev_slider_1164_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_1164_1");
	}else{
		dzrevapi = dzQuery("#rev_slider_1164_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"src/assets/plugins/revolution/revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
				mouseScrollReverse:"default",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				}
				,
				arrows: {
					style:"gyges",
					enable:true,
					hide_onmobile:false,
					hide_over:1199,
					hide_onleave:false,
					tmp:'',
					left: {
						h_align:"right",
						v_align:"bottom",
						h_offset:60,
						v_offset:20
					},
					right: {
						h_align:"right",
						v_align:"bottom",
						h_offset:20,
						v_offset:20
					}
				}
				,
				tabs: {
					style:"news-header",
					enable:true,
					width:350,
					height:50,
					min_width:350,
					wrapper_padding:5,
					wrapper_color:"transparent",
					wrapper_opacity:"0.05",
					tmp:'<div class="tp-tab-title">{{title}} <i style="float:right; margin-top:5px;" class="fa fa-chevron-right"></i></div><div class="tp-tab-desc">{{param1}}</div>',
					visibleAmount: 3,
					hide_onmobile: true,
					hide_under:1200,
					hide_onleave:false,
					hide_delay:200,
					direction:"vertical",
					span:false,
					position:"inner",
					space:25,
					h_align:"right",
					v_align:"bottom",
					h_offset:43,
					v_offset:110
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"single",
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:400,
				levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
				type:"scroll",
			},
			shadow:0,
			spinner:"off",
			stopLoop:"on",
			stopAfterLoops:0,
			stopAtSlide:1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffset: "0px",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}
}
function dz_rev_slider_4(){
	if(dzQuery("#rev_slider_26_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_26_1");
	}else{
		dzrevapi = dzQuery("#rev_slider_26_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"src/assets/plugins/revolution/revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
				mouseScrollReverse:"default",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					touchOnDesktop:"off",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				}
				,
				arrows: {
					style:"uranus",
					enable:true,
					hide_onmobile:true,
					hide_under:778,
					hide_onleave:false,
					tmp:'',
					left: {
						h_align:"left",
						v_align:"center",
						h_offset:15,
						v_offset:0
					},
					right: {
						h_align:"right",
						v_align:"center",
						h_offset:15,
						v_offset:0
					}
				}
				,
				bullets: {
					enable:true,
					hide_onmobile:false,
					style:"bullet-bar",
					hide_onleave:false,
					direction:"horizontal",
					h_align:"center",
					v_align:"bottom",
					h_offset:0,
					v_offset:30,
					space:5,
					tmp:''
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:2000,
				levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
			},
			shadow:0,
			spinner:"off",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "0",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}
}
function dz_rev_slider_5(){
	if(dzQuery("#rev_slider_1083_1").revolution == undefined){
	revslider_showDoubleJqueryError("#rev_slider_1083_1");
	}else{
	dzrevapi = dzQuery("#rev_slider_1083_1").show().revolution({
	sliderType:"standard",
	jsFileLocation:"src/assets/plugins/revolution/revolution/js/",
	sliderLayout:"auto",
	dottedOverlay:"none",
	delay:6000,
	navigation: {
		keyboardNavigation:"off",
		keyboard_direction: "horizontal",
		mouseScrollNavigation:"off",
		mouseScrollReverse:"default",
		onHoverStop:"off",
		touch:{
			touchenabled:"on",
			swipe_threshold: 75,
			swipe_min_touches: 1,
			swipe_direction: "horizontal",
			drag_block_vertical: false
		}
		,
		bullets: {
			enable:true,
			hide_onmobile:true,
			hide_under:600,
			style:"hermes",
			hide_onleave:true,
			hide_delay:200,
			hide_delay_mobile:1200,
			direction:"vertical",
			h_align:"right",
			v_align:"center",
			h_offset:30,
			v_offset:0,
			space:5,
			tmp:''
		}
	},
	viewPort: {
		enable:true,
		outof:"pause",
		visible_area:"80%",
		presize:false
	},
	responsiveLevels:[1240,1024,778,480],
	visibilityLevels:[1240,1024,778,480],
	gridwidth:[1240,1024,778,480],
	gridheight:[700,600,500,400],
	lazyType:"none",
	parallax: {
		type:"mouse",
		origo:"slidercenter",
		speed:2000,
		levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
		type:"mouse",
	},
	shadow:0,
	spinner:"off",
	stopLoop:"off",
	stopAfterLoops:-1,
	stopAtSlide:-1,
	shuffle:"off",
	autoHeight:"off",
	hideThumbsOnMobile:"off",
	hideSliderAtLimit:0,
	hideCaptionAtLimit:0,
	hideAllCaptionAtLilmit:0,
	debugMode:false,
	fallbacks: {
		simplifyAll:"off",
		nextSlideOnWindowFocus:"off",
		disableFocusListener:false,
	}
	});
	}
}

jQuery(document).ready(function() {
	'use strict';
	dz_rev_slider_1();
});	/*ready*/