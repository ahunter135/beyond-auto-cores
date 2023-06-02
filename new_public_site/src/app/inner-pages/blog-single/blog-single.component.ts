import { Component, OnInit } from '@angular/core';
declare var TradeZone: any;
@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {
	
	banner : any = {
		
		pagetitle: "Terms and Conditions",
		bg_image: "bnr2.jpg",
		title: "",
	}

  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
  }

}
