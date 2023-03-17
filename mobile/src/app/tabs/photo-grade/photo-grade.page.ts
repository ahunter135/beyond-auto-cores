import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { Browser } from '@capacitor/browser';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import {
  InfiniteScrollCustomEvent,
  SegmentCustomEvent,
  IonContent,
  NavController,
} from '@ionic/angular';
import { AccountService } from '@app/common/services/account.service';
import { PhotoGradeList } from '@app/common/models/photo-grade';
import { EnvironmentService } from '@app/common/services/environment.service';

@Component({
  selector: 'app-photo-grade',
  templateUrl: './photo-grade.page.html',
  styleUrls: ['./photo-grade.page.scss'],
})
export class PhotoGradePage implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  photoGradeList: PhotoGradeList = { pagination: null, data: [] };
  defaultSegment = 'submitted';
  isLoading = false;
  gradeCredits = 0;
  navigationSubscription: Subscription;

  constructor(
    private route: Router,
    private photoGradeService: PhotoGradeService,
    private accountService: AccountService,
    private environmentService: EnvironmentService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.onLoad();
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  async onLoad() {
    this.defaultSegment = 'submitted';

    this.isLoading = true;
    this.photoGradeList = await this.photoGradeService.photoGradeList({
      pageNumber: 1,
      pageSize: 10,
      searchCategory: 'photoGradeStatus',
      searchQuery: '0',
    });
    this.accountService.currentUserState$.subscribe(() => {
      this.gradeCredits = this.accountService.currentUser?.gradeCredits;
    });
    this.isLoading = false;
  }

  async segmentChanged(e: Event) {
    this.content.scrollToTop(0);

    const event = e as SegmentCustomEvent;
    if (event.detail.value !== this.defaultSegment) {
      this.isLoading = true;
      this.photoGradeList = { data: [], pagination: null };
      this.defaultSegment = event.detail.value;

      if (this.defaultSegment === 'submitted') {
        this.photoGradeList = await this.photoGradeService.photoGradeList({
          pageNumber: 1,
          pageSize: 10,
          searchCategory: 'photoGradeStatus',
          searchQuery: '0',
        });
        this.isLoading = false;
      } else {
        this.photoGradeList =
          await this.photoGradeService.photoGradeCompletedList({
            pageNumber: 1,
            pageSize: 10,
          });
        this.isLoading = false;
        console.log(this.photoGradeList);
      }
    }
  }

  async onIonInfinite(ev) {
    const nextLink = this.photoGradeList?.pagination?.nextPageLink;
    this.isLoading = true;

    if (nextLink && !this.photoGradeService.isLoadingMore) {
      const { data, pagination } = await this.photoGradeService.nextPhotoGrade(
        nextLink
      );

      this.photoGradeList = {
        data: [...this.photoGradeList.data, ...data],
        pagination,
      };
    }

    this.isLoading = false;

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  newPhotoGrade() {
    this.navCtrl.navigateForward('/create-photo-grade')
  }

  async purchaseMore() {
    await Browser.open({ url: this.environmentService.signInUrl });
  }
}
