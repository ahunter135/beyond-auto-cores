import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


declare var menuList: any[];

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.css']
})
export class HeaderOneComponent implements OnInit {
	
	@Input() data : any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
