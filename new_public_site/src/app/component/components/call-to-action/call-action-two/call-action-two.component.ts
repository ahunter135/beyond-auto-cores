import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-call-action-two',
  templateUrl: './call-action-two.component.html',
  styleUrls: ['./call-action-two.component.css']
})
export class CallActionTwoComponent implements OnInit {
	
	@Input() data : any;
	
	email = "info@example.com";
	contact_no = "0800-123456";

  constructor() { }

  ngOnInit(): void {
  }

}
