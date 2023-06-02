import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-blog-four',
  templateUrl: './blog-four.component.html',
  styleUrls: ['./blog-four.component.css']
})
export class BlogFourComponent implements OnInit {
	
	@Input()  data : any;
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		navSpeed: 3000,
		margin:30,
		nav:false,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 2
			},
			940: {
				items: 3
			}
		}
	}

  constructor() { }

  ngOnInit(): void {
  }

}
