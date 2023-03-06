import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedTab = 'home';

  constructor() {}

  ngOnInit() {}

  onSelectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
