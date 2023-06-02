import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header-one',
  templateUrl: './page-header-one.component.html',
  styleUrls: ['./page-header-one.component.css']
})
export class PageHeaderOneComponent implements OnInit {
	
	@Input() data : any;

  constructor() { }

  ngOnInit(): void {
  }

}
