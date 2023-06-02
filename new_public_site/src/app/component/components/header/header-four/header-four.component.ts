import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var menuList: any[];


@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.css']
})
export class HeaderFourComponent implements OnInit {
	
	@Input() data : any;
	
	//pageSlug : any = this.router.url;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
