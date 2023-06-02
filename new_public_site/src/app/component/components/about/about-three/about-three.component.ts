import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-three',
  templateUrl: './about-three.component.html',
  styleUrls: ['./about-three.component.css']
})
export class AboutThreeComponent implements OnInit {
	
	subtitle= "Step into the World of Organics!";
	title= "About Agriculture";
	description= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
	
	itemList: any[] = [
		{list: "The Most Famous Antagoniststhat Did Agriculture In Movies"},
		{list: "The Myths And Realities Of agriculture"},
		{list: "How I Forgot About Agriculture For Awhole Month"},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
