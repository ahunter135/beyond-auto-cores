import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-two',
  templateUrl: './blog-two.component.html',
  styleUrls: ['./blog-two.component.css']
})
export class BlogTwoComponent implements OnInit {
	
	blogList: any[] = [
		{
			image: "pic1.jpg",
			date: "10 Aug 2016",
			category: "Store",
			title: "The Shocking Revelation of Food Industry.",
			comment: "5k",
		},
		{
			image: "pic2.jpg",
			date: "10 Aug 2016",
			category: "Products",
			title: "Why Is Food Industry So Famous?",
			comment: "5k",
		},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
