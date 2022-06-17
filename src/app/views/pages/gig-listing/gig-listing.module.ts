import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GigListingRoutingModule } from "./gig-listing-routing.module";
import { SharedGigListingModule } from "src/app/core/shared-gig-listing/sharedGigListing.module";
import { MobileGigListingComponent } from "./mobile-gig-listing/mobile-gig-listing.component";
import { DesktopGigListingComponent } from "./desktop-gig-listing/desktop-gig-listing.component";
import { GigListingComponent } from "./gig-listing/gig-listing.component";
import { SharedModule } from "src/app/core/shared/shared.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import {CarouselModule} from 'primeng/carousel';
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";

@NgModule({
  declarations: [
    MobileGigListingComponent,
    DesktopGigListingComponent,
    GigListingComponent,
  ],
  imports: [
    CommonModule,
    GigListingRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    SharedGigListingModule,
    CarouselModule,
    FeahterIconModule
  ],
})
export class GigListingModule {}
