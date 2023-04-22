import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedTab = 'home';
  closed$ = new Subject<any>();
  showTabs = true;
  constructor(private _router: Router) {}

  ngOnInit() {
    
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe(event => {
      console.log(event['url'])
      if (event['url'] === '/tabs/tabs/inventory/lot-list') {
        this.showTabs = false;
      } else {
        this.showTabs = true;
      }
    });
  }

  onSelectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
