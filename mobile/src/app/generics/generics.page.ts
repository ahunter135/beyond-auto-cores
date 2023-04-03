import { Component, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  InputCustomEvent,
  IonInput,
} from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

import { CodesService } from '@app/common/services/codes.service';
import { CodeList } from '@models/codes';

@Component({
  selector: 'app-generics',
  templateUrl: './generics.page.html',
  styleUrls: ['./generics.page.scss'],
})
export class GenericsPage implements OnInit {
  @ViewChild('search') searchInput: IonInput;
  searchCode = '';
  dataCodes: CodeList | null = { data: [], pagination: null };
  isLoading = false;

  constructor(private codesService: CodesService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.dataCodes = await this.codesService.codes({
      pageSize: 10,
      pageNumber: 1,
      isCustom: false,
      isAdmin: true,
      notIncludePGItem: false,
    });
    this.isLoading = false;
  }

  async onSearch(e: Event) {
    const event = e as InputCustomEvent;
    const { value } = event.detail;
    this.isLoading = true;

    this.dataCodes = await this.codesService.codes({
      searchCategory: 'converterName',
      searchQuery: value,
      pageNumber: 1,
      pageSize: 24,
      isCustom: false,
      isAdmin: true,
      notIncludePGItem: false,
    });
    this.isLoading = false;

    console.log(this.dataCodes);
  }

  async hideKeyboard(_) {
    Keyboard.hide();
    const element = await this.searchInput.getInputElement();
    element.blur(); // Hack to stop bouncing keyboard.
  }

  async onIonInfinite(ev) {
    if (!this.searchCode) {
      const nextLink = this.dataCodes.pagination.nextPageLink;
      this.isLoading = true;

      if (nextLink && !this.codesService.isLoadingMore) {
        const { data, pagination } = await this.codesService.nextCodes(
          nextLink,
          {
            searchCategory: 'converterName',
            isCustom: false,
            isAdmin: true,
            notIncludePGItem: false,
          }
        );
        this.dataCodes = {
          data: [...this.dataCodes.data, ...data],
          pagination,
        };
      }

      this.isLoading = false;
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
