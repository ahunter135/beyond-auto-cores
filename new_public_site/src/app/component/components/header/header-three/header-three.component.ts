import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var menuList: any[];

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.css']
})
export class HeaderThreeComponent implements OnInit {
	loggedIn: boolean = false;
	@Input() data : any;
	
	//pageSlug : any = this.router.url;
	

  constructor(private router: Router) {
    this.loggedIn = window.localStorage.getItem("access_token") != null;
  }

  ngOnInit(): void {
  }

  scroll(ev: Event, el: string) {
    ev.preventDefault();
    console.log(el);
    document.getElementById(el)?.scrollIntoView();
  }

  navTo(ev: Event, nav: string) {
    ev.preventDefault();
    this.router.navigateByUrl(nav);
  }
  logout(ev: Event) {
    ev.preventDefault();
    window.localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
