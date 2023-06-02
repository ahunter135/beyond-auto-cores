import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var menuList: any[];


@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.css']
})
export class HeaderTwoComponent implements OnInit {
	@Input() data : any;
	
	//pageSlug : any = this.router.url;

	
	constructor(private router: Router) { }

	ngOnInit(): void {
	    //console.log(this.router.url);
		//pageSlug : any = this.router.url;
		//console.log( window.location.href);
	}

}
