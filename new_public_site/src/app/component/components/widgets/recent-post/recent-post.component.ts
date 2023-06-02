import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.css']
})
export class RecentPostComponent implements OnInit {
	
	title = "Recent Posts";
	
	widget_post : any [] = [
		{
			image: "pic1.jpg",
			date: "13 Aug ",
			author: "By <a href='javascript:void(0);'>Jack</a>",
			title: "How To Get People To Like Industry",
		},
		{
			image: "pic2.jpg",
			date: "13 Aug ",
			author: "By <a href='javascript:void(0);'>Jamie</a>",
			title: "Seven Doubts You Should Clarify About",
		},
		{
			image: "pic1.jpg",
			date: "13 Aug ",
			author: "By <a href='javascript:void(0);'>Winnie</a>",
			title: "Why You Should Not Go To Industry",
		},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
