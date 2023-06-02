/**
Core script to handle the entire theme and core functions
**/
var TradeZone = function(){
	/* Search Bar ============ */
	siteUrl = '';
	
	var screenWidth = $( window ).width();
	
	var homeSearch = function() {
		'use strict';
		/* top search in header on click function */
		var quikSearch = jQuery("#quik-search-btn");
		var quikSearchRemove = jQuery("#quik-search-remove");
		
		quikSearch.on('click',function() {
			
			jQuery('.dlab-quik-search').fadeIn(500);
			jQuery('.dlab-quik-search').addClass('On');
			
			
		});
		
		quikSearchRemove.on('click',function() {
			jQuery('.dlab-quik-search').fadeOut(500);
			jQuery('.dlab-quik-search').removeClass('On');
			
			
		});	
		/* top search in header on click function End*/
	}
	
	
	/* One Page Layout ============ */
	var onePageLayout = function() {
		'use strict';
		var headerHeight =   parseInt($('.onepage').css('height'), 10);

		
		$(".scroll").unbind().on('click',function(event) 
		{
			event.preventDefault();
					//alert("Angular");
			if (this.hash !== "") {
				var hash = this.hash;	
				var seactionPosition = $(hash).offset().top;
				var headerHeight =   parseInt($('.onepage').css('height'), 10);
				
				
				$('body').scrollspy({target: ".navbar", offset: headerHeight+2}); 
				
				var scrollTopPosition = seactionPosition - (headerHeight);
				
				$('html, body').animate({
					scrollTop: scrollTopPosition
				}, 800, function(){
					
				});
			}   
		});
		$('body').scrollspy({target: ".navbar", offset: headerHeight + 2});  
	}
	
	/* Header Height ============ */
	var handleResizeElement = function(){
		var HeaderHeight = $('.header').height();
		$('.header').css('height', HeaderHeight);
	}
	
	/* Load File ============ */
	var dzTheme = function(){
		 'use strict';
		 var loadingImage = '<img src="images/loading.gif">';
		 jQuery('.dzload').each(function(){
		 var dzsrc =   siteUrl + $(this).attr('dzsrc');
		  //jQuery(this).html(loadingImage);
		 	jQuery(this).hide(function(){
				jQuery(this).load(dzsrc, function(){
					jQuery(this).fadeIn('slow');
				}); 
			})
			
		 });
		 
		
		if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
				if(jQuery(this).parent().hasClass('open'))
				{
					jQuery(this).parent().removeClass('open');
				}
				else{
					jQuery(this).parent().parent().find('li').removeClass('open');
					jQuery(this).parent().addClass('open');
				}
			});
		}
	}
	
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		'use strict';	
		/* magnificPopup function */
		jQuery('.mfp-gallery').magnificPopup({
			delegate: '.mfp-link',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small></small>';
				}
			}
		});
		/* magnificPopup function end */
		
		/* magnificPopup for paly video function */		
		jQuery('.video').magnificPopup({
			type: 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
						 '<div class="mfp-close"></div>'+
						 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						 '<div class="mfp-title">Some caption</div>'+
						 '</div>'
			},
			callbacks: {
				markupParse: function(template, values, item) {
					values.title = item.el.attr('title');
				}
			}
		});
		/* magnificPopup for paly video function end*/
		/* $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		}); */
	}
	
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		'use strict';
		var scrollTop = jQuery("button.scroltop");
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).bind("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* handle Accordian ============ */
	var handleAccordian = function(){
		/* accodin open close icon change */	 	
		jQuery('#accordion').on('hidden.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		jQuery('#accordion').on('shown.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		/* accodin open close icon change end */
	}
	
		
	
	/* Footer Align ============ */
	var footerAlign = function() {
		'use strict';
        setTimeout(function(){
            jQuery('.site-footer').css('display', 'block');
            jQuery('.site-footer').css('height', 'auto');
            var footerHeight = jQuery('.site-footer').outerHeight();
            jQuery('.footer-fixed > .page-wraper').css('padding-bottom', footerHeight);
            jQuery('.site-footer').css('height', footerHeight);
        },500);
	}
	
	
	
	/* Header Fixed ============ */
	var headerFix = function(){
		'use strict';
		/* Main navigation fixed on top  when scroll down function custom */		
		jQuery(window).bind('scroll', function () {
			if(jQuery('.sticky-header').length)
			{
				var menu = jQuery('.sticky-header');
				if ($(window).scrollTop() > menu.offset().top) {
					menu.addClass('is-fixed');
				} else {
					menu.removeClass('is-fixed');
				}
			}
		});
		/* Main navigation fixed on top  when scroll down function custom end*/
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		'use strict';
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length)
		{
			var self = $("#masonry, .masonry");
			if(jQuery('.card-container').length)
		    {
				self.imagesLoaded(function () {
					self.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			}
		}
	}
	
		
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length)
		{
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
	}
	
	/* Video Popup ============ */
	var handleVideo = function(){
		/* Video responsive function */	
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');	
		/* Video responsive function end */
	}
	
	/* Gallery Filter ============ */
	var handleFilterMasonary = function(){
		/* gallery filter activation = jquery.mixitup.min.js */ 
		if (jQuery('#image-gallery-mix').length) {
			jQuery('.gallery-filter').find('li').each(function () {
				$(this).addClass('filter');
			});
			jQuery('#image-gallery-mix').mixItUp();
		};
		if(jQuery('.gallery-filter.masonary').length){
			jQuery('.gallery-filter.masonary').on('click','span', function(){
				var selector = $(this).parent().attr('data-filter');
				jQuery('.gallery-filter.masonary span').parent().removeClass('active');
				jQuery(this).parent().addClass('active');
				jQuery('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
		}
		/* gallery filter activation = jquery.mixitup.min.js */
	}
	
	/* handle Bootstrap Select ============ */
	var handleBootstrapSelect = function(){
		/* Bootstrap Select box function by  = bootstrap-select.min.js */ 
		if (jQuery('select').length) {
		    jQuery('select').selectpicker();
		}
		/* Bootstrap Select box function by  = bootstrap-select.min.js end*/
	}
	
	/* handle Bootstrap Touch Spin ============ */
	var handleBootstrapTouchSpin = function(){
		jQuery("input[name='demo_vertical2']").TouchSpin({
		  verticalbuttons: true,
		  verticalupclass: 'ti ti-plus',
		  verticaldownclass: 'ti ti-minus'
		});
		
	}
	
	
	
	/* WOW ANIMATION ============ */
	var wow_animation = function(){
		if($('.wow').length > 0)
		{
			var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       50,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}	
	}
	
	
	
	var reposition = function (){
		'use strict';
		var modal = jQuery(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		
		/* Dividing by two centers the modal exactly, but dividing by three 
		 or four works better for larger screens.  */
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}
	
	var handelResize = function (){
		
		/* Reposition when the window is resized */
		jQuery(window).on('resize', function() {
			jQuery('.modal:visible').each(reposition);
		
			footerAlign();
		});
	}
	
	/* Header Height ============ */
	var setResizeMargin = function(){
		if(($('.setResizeMargin').length > 0) && screenWidth >= 1280){
			var containerSize = $('.container').width();
			var getMargin = (screenWidth - containerSize)/2;
			$('.setResizeMargin').css('margin-left',getMargin);
		}
		
		if(($('.setResizeMarginRight').length > 0) && screenWidth >= 1280){
			var containerSize = $('.container').width();
			var getMargin = (screenWidth - containerSize)/2;
			$('.setResizeMarginRight').css('margin-right',getMargin);
		}
	}
	
	
	
	/* Load File ============ */
	var dzTheme = function(){
		 'use strict';
		
				
		if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
				//e.preventDefault();
				if(jQuery(this).parent().hasClass('open'))
				{
					jQuery(this).parent().removeClass('open');
				}
				else{
					jQuery(this).parent().parent().find('li').removeClass('open');
					jQuery(this).parent().addClass('open');
				}
			});
		}
		
		jQuery('.full-sidenav .navbar-nav > li > a').next('.sub-menu').slideUp();
		jQuery('.full-sidenav .sub-menu > li > a').next('.sub-menu').slideUp();
			
		jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a').unbind().on('click', function(e){
			jQuery('.full-sidenav .navbar-nav > li > a').not(this).next('.sub-menu').slideUp();
			jQuery(this).next('.sub-menu').toggle(500);
		});
		
		jQuery('.menu-icon').on('click',function(){
			jQuery('.menu-close,.full-sidenav').addClass('active');
			onePageLayout();
		});
		jQuery('.menu-close').on('click',function(){
			jQuery('.menu-close,.full-sidenav').removeClass('active');
		});
		
	}
	
	/* Function ============ */
	return {
		init:function(){
			onePageLayout();
			wow_animation();
			dzTheme();
			handleResizeElement();
			homeSearch();
			MagnificPopup();
			handleAccordian();
			scrollTop();
			footerAlign();
			headerFix();
			handleVideo();
			handleFilterMasonary();
			setResizeMargin();
			handelResize();
			jQuery('.modal').on('show.bs.modal', reposition);
		},
		
		
		load:function(){
			handleBootstrapSelect();
			//handleBootstrapTouchSpin();
			counter();
			masonryBox();
		},
		
		resize:function(){
			screenWidth = $(window).width();
			dzTheme();
			handleResizeElement();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    
	TradeZone.init();
	
	$('a[data-toggle="tab"]').click(function(){
		// todo remove snippet on bootstrap v4
		$('a[data-toggle="tab"]').click(function() {
		  $($(this).attr('href')).show().addClass('show active').siblings().hide();
		})
	});	

	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});
});
/* Document.ready END */

/* Window Load START */
jQuery(window).load(function () {
	
	TradeZone.load();
	setTimeout(function(){
		jQuery('#loading-area').remove();
	}, 0);
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
	
	TradeZone.resize();
});
/*  Window Resize END */