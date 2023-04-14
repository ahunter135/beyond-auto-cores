import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { interval, Subject, Subscription } from 'rxjs';

import { PartnersService } from '@app/common/services/partners.service';
import { PartnerList } from '@app/common/models/partners';
import { MetalService } from '@app/common/services/metal.service';
import { MetalPrices } from '@app/common/models/metals';
import { currencyFormat } from '@utils/currencyUtils';
import { toLocalTime } from '@app/common/utils/timeUtils';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  partners: PartnerList = {
    data: [],
    pagination: null,
  };
  fileUrls = []
  currentMetalPrices: MetalPrices;
  rhodiumPrices: MetalPrices;
  palladiumPrices: MetalPrices;
  platinumPrices: MetalPrices;
  metalChart: Chart;
  loader: any;

  slideOpts: SwiperOptions = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      stopOnLastSlide: false,
    },
    effect: 'fade',
    slidesPerView: 'auto',
    speed: 1500,
    navigation: false,
    pagination: false,
  };

  is1M = true;

  metalSelected = {
    platinum: false,
    palladium: false,
    rhodium: true,
  };

  chartColor = {
    default: { hex: '#9c9c9c', rgba: 'rgba(156,156,156, 1)', metalId: null },
    platinum: {
      hex: '#E94276',
      rgba: 'rgba(233,66,117,255)',
      rgbaOpacity: 'rgba(233,66,117,0.1)',
      metalId: 0,
    },
    palladium: {
      hex: '#418AF1',
      rgba: 'rgba(65,138,241,255)',
      rgbaOpacity: 'rgba(65,138,241,0.1)',
      metalId: 1,
    },
    rhodium: {
      hex: '#0BE597',
      rgba: 'rgba(6,229,151,255)',
      rgbaOpacity: 'rgba(6,229,151,0.1)',
      metalId: 2,
    },
  };

  selectedColor = this.chartColor.rhodium;

  stopPolling = new Subject();
  metalPriceSubscription: Subscription;

  constructor(
    private partnersService: PartnersService,
    private metalService: MetalService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.createChart();
    this.partners = await this.partnersService.partners({
      includeLogoUrl: true,
    });
    this.partners.data.forEach((element) => {
      if (element.fileUrl) {
        this.fileUrls.push(element.fileUrl)
      }
    })
    this.initLoadMetalPrices(); // first load

    const intervalMetalPrice = interval(60000);

    const intervalSubscription = intervalMetalPrice.pipe();
    this.metalPriceSubscription = intervalSubscription.subscribe(() => {
      this.initLoadMetalPrices();
    });
  }

  ngOnDestroy() {
    if (this.metalPriceSubscription) {
      this.metalPriceSubscription.unsubscribe();
    }
  }

  async initLoadMetalPrices() {
    this.platinumPrices = await this.getMetalPrices(0);
    this.palladiumPrices = await this.getMetalPrices(1);
    this.rhodiumPrices = await this.getMetalPrices(2);
  }

  async getMetalPrices(metalId = 2) {
    const metalPrices = await this.metalService.metalPrices({
      metal: metalId,
      reportType: this.is1M ? 0 : 1,
    });

    return {
      ...metalPrices,
      lastUpdate: toLocalTime(metalPrices.lastUpdate),
      lastPrice: currencyFormat(metalPrices.lastPrice as number),
      bidPrice: currencyFormat(metalPrices.bidPrice as number),
      oneDayPercentChange: `${(
        metalPrices.oneDayPercentChange as number
      ).toFixed(2)}%`,
      isNegative: metalPrices.oneDayPercentChange < 0,
    } as MetalPrices;
  }

  async createChart() {
    let showLoading = false;
    let apiCallTimer = window.setTimeout(() => {
      showLoading = true;
    }, 200);

    this.currentMetalPrices = await this.getMetalPrices(
      this.selectedColor.metalId
    );

    const canvas = document.getElementById('MetalPriceChart') as any;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0.2, this.selectedColor.rgba);
    gradient.addColorStop(0.9, this.selectedColor.rgbaOpacity);
    //gradient.addColorStop(0.8, 'rgba(255,255,255,0.1)');
    //gradient.addColorStop(0.9, 'rgba(33,37,64,0.05)');

    const xValues = this.currentMetalPrices.priceHistory.map((history) =>
      moment(history.dateInterval).format('MM/DD/YYYY HH:MM A')
    );

    this.metalChart = new Chart('MetalPriceChart', {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            data: this.currentMetalPrices.priceHistory.map(
              (history) => history.lastPrice
            ),
            borderColor: this.selectedColor.hex,
            backgroundColor: gradient,
            fill: true,
            tension: 0,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          point: {
            hitRadius: 50,
            radius: 0,
            pointStyle: 'circle',
          },
        },
        plugins: {
          tooltip: {
            position: 'nearest',
            includeInvisible: true,
            bodyFont: { size: 12, weight: '600' },
            enabled: true,
            mode: 'nearest',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            displayColors: false,
            yAlign: 'top',
            callbacks: {
              label: (tooltipItem) => currencyFormat(tooltipItem.parsed.y),
              title: () => '',
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
      },
    });

    //loading.dismiss();
  }

  toggleGraphFilter(active: boolean) {
    this.is1M = active;
    this.metalChart.destroy();
    this.createChart();
  }

  onSelectMetal(metal: Metal) {
    this.selectedColor = this.chartColor[metal];
    this.metalChart.destroy();

    this.createChart();

    for (const key in this.metalSelected) {
      if (key === metal) {
        this.metalSelected[key] = true;
      } else {
        this.metalSelected[key] = false;
      }
    }
  }

  getStyleMetalSelected(metalSelected: boolean, isNegative: boolean) {
    return metalSelected
      ? `paragraph-text-12-bold ${isNegative ? 'red' : 'green'}-500`
      : `paragraph-text-12-light ${isNegative ? 'red' : 'green'}-500`;
  }
}

export type Metal = 'platinum' | 'palladium' | 'rhodium';
