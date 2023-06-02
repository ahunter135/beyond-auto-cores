/* JavaScript Document */
jQuery(document).ready(function() {
   
   /*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.blog-carousel').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},			
			991:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})
	
	/*  testimonial one function by = owl.carousel.js */
	jQuery('.testimonial-one').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			767:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})		
	
	/*  testimonial one function by = owl.carousel.js */
	jQuery('.testimonial-solar').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		dots: true,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			767:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})		
	
	/*Custom Navigation work*/
	jQuery('#next-slide').on('click', function(){
	   $('.testimonial-solar').trigger('next.owl.carousel');
	});

	jQuery('#prev-slide').on('click', function(){
	   $('.testimonial-solar').trigger('prev.owl.carousel');
	});
	/*Custom Navigation work*/
	
	/*  testimonial three function by = owl.carousel.js */
	jQuery('.testimonial-three').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:2
			},			
			
			991:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})
	
	/*  Our Classes function by = owl.carousel.js */
	jQuery('.item-center').owlCarousel({
		center: true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		items:3,
		loop:true,
		margin:0,
		nav:false,
		dots:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			767:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})	
	
	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.owl-project').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		responsive:true,
		margin:30,
		nav:false,
		dots: false,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2,
				margin:15
			},
			700:{
				items:2,
				margin:15
			},		
			1024:{
				items:3
			},
			1200:{
				items:3
			}
		}
	})
	
	
	/*  testimonial one function by = owl.carousel.js */
	jQuery('.team-box-carousel').owlCarousel({
		loop:true,
		autoplay:false,
		center: true,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:2
			},			
			
			767:{
				items:2
			},
			1000:{
				items:4
			}
		}
	})	
	
	/*  testimonial four function by = owl.carousel.js */
	jQuery('.testimonial-box-carousel2').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:false,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0:{
				items:1
			},
			991:{
				items:2
			}
		}
	})
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.project-carousel').owlCarousel({
		loop:true,
		margin:20,
		center: true,
		nav:true,
		dots: false,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},			
			1024:{
				items:2
			},
			1200:{
				items:2
			}
		}
	})
	
	jQuery('.project-carousel-bx1').owlCarousel({
		loop:true,
		autoplay:true,
		left:true,
		margin:0,
		nav:true,
		dots: false,
		navText: ['<i class="la la-long-arrow-alt-left"></i>', '<i class="la la-long-arrow-alt-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:2
			},			
			
			767:{
				items:2
			},
			1000:{
				items:3
				
			}
		}
	})
	
});

/* Document .ready END */