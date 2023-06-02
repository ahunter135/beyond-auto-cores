import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { TradezoneComponent } from './tradezone/tradezone.component';
//import { ComponentsComponent } from './components/components.component';
import { IndexComponent } from './index/index.component';
import { IndexFoodFactoryComponent } from './index-food-factory/index-food-factory.component';
import { IndexSteelPlantComponent } from './index-steel-plant/index-steel-plant.component';
import { IndexSolarPlantComponent } from './index-solar-plant/index-solar-plant.component';
import { IndexAgricultureComponent } from './index-agriculture/index-agriculture.component';
import { BlogListOneComponent } from './inner-pages/blog-list-one/blog-list-one.component';
import { BlogListTwoComponent } from './inner-pages/blog-list-two/blog-list-two.component';
import { BlogSingleComponent } from './inner-pages/blog-single/blog-single.component';
import { ContactPageComponent } from './inner-pages/contact-page/contact-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentModule } from './component/component.module';


@NgModule({
  declarations: [
    AppComponent,
    //ComponentsComponent,
    IndexComponent,
    IndexFoodFactoryComponent,
    IndexSteelPlantComponent,
    IndexSolarPlantComponent,
    IndexAgricultureComponent,
    //TradezoneComponent,
    BlogListOneComponent,
    BlogListTwoComponent,
    BlogSingleComponent,
    ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentModule,
    CarouselModule,
    CommonModule,
    NgbModule,
    NgxPageScrollModule,
    //TradezoneComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
