import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
//import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderOneComponent } from './components/header/header-one/header-one.component';
import { HeaderTwoComponent } from './components/header/header-two/header-two.component';
import { HeaderThreeComponent } from './components/header/header-three/header-three.component';
import { HeaderFourComponent } from './components/header/header-four/header-four.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterOneComponent } from './components/footer/footer-one/footer-one.component';
import { FooterTwoComponent } from './components/footer/footer-two/footer-two.component';
import { FooterThreeComponent } from './components/footer/footer-three/footer-three.component';
import { FooterFourComponent } from './components/footer/footer-four/footer-four.component';
import { ServiceComponent } from './components/service/service.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { AboutComponent } from './components/about/about.component';
import { SlidersComponent } from './components/sliders/sliders.component';
import { TeamComponent } from './components/team/team.component';
import { BlogComponent } from './components/blog/blog.component';
import { WorkComponent } from './components/work/work.component';
import { ContactComponent } from './components/contact/contact.component';
import { CommentsComponent } from './components/comments/comments.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { SearchComponent } from './components/widgets/search/search.component';
import { RecentPostComponent } from './components/widgets/recent-post/recent-post.component';
import { NewsletterComponent } from './components/widgets/newsletter/newsletter.component';
import { CategoryListComponent } from './components/widgets/category-list/category-list.component';
import { ArchivesComponent } from './components/widgets/archives/archives.component';
import { ServiceOneComponent } from './components/service/service-one/service-one.component';
import { ServiceTwoComponent } from './components/service/service-two/service-two.component';
import { ServiceThreeComponent } from './components/service/service-three/service-three.component';
import { ServiceFourComponent } from './components/service/service-four/service-four.component';
import { AboutOneComponent } from './components/about/about-one/about-one.component';
import { AboutTwoComponent } from './components/about/about-two/about-two.component';
import { AboutThreeComponent } from './components/about/about-three/about-three.component';
import { AboutFourComponent } from './components/about/about-four/about-four.component';
import { AboutFiveComponent } from './components/about/about-five/about-five.component';
import { BlogOneComponent } from './components/blog/blog-one/blog-one.component';
import { BlogTwoComponent } from './components/blog/blog-two/blog-two.component';
import { BlogThreeComponent } from './components/blog/blog-three/blog-three.component';
import { SliderOneComponent } from './components/sliders/slider-one/slider-one.component';
import { SliderTwoComponent } from './components/sliders/slider-two/slider-two.component';
import { SliderThreeComponent } from './components/sliders/slider-three/slider-three.component';
import { SliderFourComponent } from './components/sliders/slider-four/slider-four.component';
import { TeamOneComponent } from './components/team/team-one/team-one.component';
import { TeamTwoComponent } from './components/team/team-two/team-two.component';
import { TeamThreeComponent } from './components/team/team-three/team-three.component';
import { TeamFourComponent } from './components/team/team-four/team-four.component';
import { TestimonialOneComponent } from './components/testimonials/testimonial-one/testimonial-one.component';
import { TestimonialTwoComponent } from './components/testimonials/testimonial-two/testimonial-two.component';
import { TestimonialThreeComponent } from './components/testimonials/testimonial-three/testimonial-three.component';
import { TestimonialFourComponent } from './components/testimonials/testimonial-four/testimonial-four.component';
import { HeaderFiveComponent } from './components/header/header-five/header-five.component';
import { WorkOneComponent } from './components/work/work-one/work-one.component';
import { WorkTwoComponent } from './components/work/work-two/work-two.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CounterComponent } from './components/counter/counter.component';
import { CounterOneComponent } from './components/counter/counter-one/counter-one.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactMapComponent } from './components/contact/contact-map/contact-map.component';
import { WorkThreeComponent } from './components/work/work-three/work-three.component';
import { TestimonialFiveComponent } from './components/testimonials/testimonial-five/testimonial-five.component';
import { FooterFiveComponent } from './components/footer/footer-five/footer-five.component';
import { PageHeaderComponent } from './components/header/page-header/page-header.component';
import { PageHeaderOneComponent } from './components/header/page-header/page-header-one/page-header-one.component';
import { ListItemsComponent } from './components/widgets/list-items/list-items.component';
import { TeamFiveComponent } from './components/team/team-five/team-five.component';
import { CallActionOneComponent } from './components/call-to-action/call-action-one/call-action-one.component';
import { CallActionTwoComponent } from './components/call-to-action/call-action-two/call-action-two.component';
import { SliderFiveComponent } from './components/sliders/slider-five/slider-five.component';
import { BlogFourComponent } from './components/blog/blog-four/blog-four.component';



@NgModule({
  declarations: [
    //ComponentsComponent,
    HeaderComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    FooterComponent,
    FooterOneComponent,
    FooterTwoComponent,
    FooterThreeComponent,
    FooterFourComponent,
    ServiceComponent,
    TestimonialsComponent,
    AboutComponent,
    SlidersComponent,
    TeamComponent,
    BlogComponent,
    WorkComponent,
    ContactComponent,
    CommentsComponent,
    WidgetsComponent,
    CallToActionComponent,
    SearchComponent,
    RecentPostComponent,
    NewsletterComponent,
    CategoryListComponent,
    ArchivesComponent,
    ServiceOneComponent,
    ServiceTwoComponent,
    ServiceThreeComponent,
    ServiceFourComponent,
    AboutOneComponent,
    AboutTwoComponent,
    AboutThreeComponent,
    AboutFourComponent,
    AboutFiveComponent,
    BlogOneComponent,
    BlogTwoComponent,
    BlogThreeComponent,
    SliderOneComponent,
    SliderTwoComponent,
    SliderThreeComponent,
    SliderFourComponent,
    TeamOneComponent,
    TeamTwoComponent,
    TeamThreeComponent,
    TeamFourComponent,
    TestimonialOneComponent,
    TestimonialTwoComponent,
    TestimonialThreeComponent,
    TestimonialFourComponent,
    HeaderFiveComponent,
    WorkOneComponent,
    WorkTwoComponent,
    CounterComponent,
    CounterOneComponent,
    ContactFormComponent,
    ContactMapComponent,
    WorkThreeComponent,
    TestimonialFiveComponent,
    FooterFiveComponent,
    PageHeaderComponent,
    PageHeaderOneComponent,
    ListItemsComponent,
    TeamFiveComponent,
    CallActionOneComponent,
    CallActionTwoComponent,
    SliderFiveComponent,
    BlogFourComponent
  ],
  exports: [
    //ComponentsComponent,
    HeaderComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    FooterComponent,
    FooterOneComponent,
    FooterTwoComponent,
    FooterThreeComponent,
    FooterFourComponent,
    ServiceComponent,
    TestimonialsComponent,
    AboutComponent,
    SlidersComponent,
    TeamComponent,
    BlogComponent,
    WorkComponent,
    ContactComponent,
    CommentsComponent,
    WidgetsComponent,
    CallToActionComponent,
    SearchComponent,
    RecentPostComponent,
    NewsletterComponent,
    CategoryListComponent,
    ArchivesComponent,
    ServiceOneComponent,
    ServiceTwoComponent,
    ServiceThreeComponent,
    ServiceFourComponent,
    AboutOneComponent,
    AboutTwoComponent,
    AboutThreeComponent,
    AboutFourComponent,
    AboutFiveComponent,
    BlogOneComponent,
    BlogTwoComponent,
    BlogThreeComponent,
    SliderOneComponent,
    SliderTwoComponent,
    SliderThreeComponent,
    SliderFourComponent,
    TeamOneComponent,
    TeamTwoComponent,
    TeamThreeComponent,
    TeamFourComponent,
    TestimonialOneComponent,
    TestimonialTwoComponent,
    TestimonialThreeComponent,
    TestimonialFourComponent,
    HeaderFiveComponent,
    WorkOneComponent,
    WorkTwoComponent,
    CounterComponent,
    CounterOneComponent,
    ContactFormComponent,
    ContactMapComponent,
    WorkThreeComponent,
    TestimonialFiveComponent,
    FooterFiveComponent,
    PageHeaderOneComponent,
    ListItemsComponent,
    TeamFiveComponent,
    CallActionOneComponent,
    CallActionTwoComponent,
    SliderFiveComponent,
    BlogFourComponent
  ],
  imports: [
    CommonModule,
	RouterModule,
	CarouselModule,
	//AppRoutingModule
  ]
})
export class ComponentModule { }
