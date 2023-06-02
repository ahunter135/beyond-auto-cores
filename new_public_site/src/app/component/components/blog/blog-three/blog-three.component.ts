import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-three',
  templateUrl: './blog-three.component.html',
  styleUrls: ['./blog-three.component.css']
})
export class BlogThreeComponent implements OnInit {
	
	
	blogList: any[] = [
		{
			image: "pic1.jpg",
			date: "10 Aug 2016",
			category: "Organic Agriculture",
			title: "Pigsty Is A Small Enclosure",
			comment: "5k",
		},
		{
			image: "pic2.jpg",
			date: "10 Aug 2016",
			category: "Increased Biodiversity",
			title: "Luscious Organic Produce",
			comment: "5k",
		},
		{
			image: "pic3.jpg",
			date: "10 Aug 2016",
			category: "Better Habitat",
			title: "Preparing The Soil",
			comment: "5k",
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

}
