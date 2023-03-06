import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert, AlertList } from '@app/common/models/alert';
import { AlertService } from '@app/common/services/alert.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  alertList: AlertList = { pagination: null, data: [] };
  isLoading = false;

  constructor(private route: Router, private alertService: AlertService) {}

  async ngOnInit() {
    this.alertService.currentSelectedAlertState$.subscribe(async () => {
      if (!this.alertService.selectedAlert) {
        this.isLoading = true;
        this.alertList = await this.alertService.alerts({
          pageSize: 10,
          pageNumber: 1,
        });
        this.isLoading = false;
      }
    });
  }

  viewNotification(alert: Alert) {
    this.alertService.setSelectedAlert = alert;
    this.route.navigate(['/notification-view']);
  }

  async onLoadMore() {
    const nextLink = this.alertList.pagination.nextPageLink;
    this.isLoading = true;

    if (nextLink && !this.alertService.isLoadingMore) {
      const { data, pagination } = await this.alertService.nextAlerts(nextLink);
      this.alertList = {
        data: [...this.alertList.data, ...data],
        pagination,
      };
    }

    this.isLoading = false;
  }
}
