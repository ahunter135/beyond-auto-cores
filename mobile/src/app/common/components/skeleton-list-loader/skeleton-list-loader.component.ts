import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-list-loader',
  templateUrl: './skeleton-list-loader.component.html',
  styleUrls: ['./skeleton-list-loader.component.scss'],
})
export class SkeletonListLoaderComponent implements OnInit {
  skeletonArray = Array(10).fill(0);

  constructor() {}

  ngOnInit() {}
}
