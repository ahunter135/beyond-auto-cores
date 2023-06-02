import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
	
	widget_list : any [] = [
	{
		title: "Categories List",
		css: "widget_archive",
		list: [
			{list_item: "<a href='#'>Electronic Materials</a>"},
			{list_item: "<a href='#'>Auto Parts</a>"},
			{list_item: "<a href='#'>Building Management</a>"},
			{list_item: "<a href='#'>Power Systems</a>"},
			{list_item: "<a href='#'>Power & Energy</a>"},
		]
	},
	{
		title: "Archives",
		css: "widget_categories",
		list: [
			{list_item: "<a href='#'>January 2019</a> (1)"},
			{list_item: "<a href='#'>Febuary 2019 </a> (6)"},
			{list_item: "<a href='#'>March 2019 </a> (1)"},
			{list_item: "<a href='#'>January 2019</a> (1)"},
			{list_item: "<a href='#'>May 2019 </a> (7)"},
			{list_item: "<a href='#'>June 2019 </a> (3)"},
		]
	}
	]
	
	
	
	
  constructor() { }

  ngOnInit(): void {
  }

}
