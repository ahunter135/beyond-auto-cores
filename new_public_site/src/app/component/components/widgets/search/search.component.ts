import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	
	title = "Search";
	icon = "fa fa-search";

  constructor() { }

  ngOnInit(): void {
  }

}
