import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "src/app/core/shared/shared.module";
import { GigDetailsRoutingModule } from "./gig-details-routing.module";
import { FundraisingDetailComponent } from "./fundraising/fundraising-detail/fundraising-detail.component";
import { DesktopFundraisingDetailComponent } from "./fundraising/desktop-fundraising-detail/desktop-fundraising-detail.component";
import { MobileFundraisingDetailComponent } from "./fundraising/mobile-fundraising-detail/mobile-fundraising-detail.component";
import { SingleGigDetailComponent } from "./singleGig/single-gig-detail/single-gig-detail.component";
import { DesktopSingleGigDetailComponent } from "./singleGig/desktop-single-gig-detail/desktop-single-gig-detail.component";
import { MobileSingleGigDetailComponent } from "./singleGig/mobile-single-gig-detail/mobile-single-gig-detail.component";
import { MultipleGigDetailComponent } from "./multipleGig/multiple-gig-detail/multiple-gig-detail.component";
import { DesktopMultipleGigDetailComponent } from "./multipleGig/desktop-multiple-gig-detail/desktop-multiple-gig-detail.component";
import { MobileMultipleGigDetailComponent } from "./multipleGig/mobile-multiple-gig-detail/mobile-multiple-gig-detail.component";
import { CarouselModule } from "primeng/carousel";
import { PaginatorModule } from "primeng/paginator";


@NgModule({
  declarations: [
    FundraisingDetailComponent,
    DesktopFundraisingDetailComponent,
    MobileFundraisingDetailComponent,
    SingleGigDetailComponent,
    DesktopSingleGigDetailComponent,
    MobileSingleGigDetailComponent,
    MultipleGigDetailComponent,
    DesktopMultipleGigDetailComponent,
    MobileMultipleGigDetailComponent,
  ],
  imports: [
    CommonModule,
    GigDetailsRoutingModule,
    MatTabsModule,
    SharedModule,
    CarouselModule,
    PaginatorModule,
  ],
})
export class GigDetailsModule {}
