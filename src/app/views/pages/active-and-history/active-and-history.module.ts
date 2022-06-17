import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ActiveAndHistoryRoutingModule } from "./active-and-history-routing.module";
import { MobileAhComponent } from "./ah/mobile-ah/mobile-ah.component";
// import { DesktopAhComponent } from "./ah/desktop-ah/desktop-ah.component";
import { ReviewDetailsComponent } from "./review-details/review-details/review-details.component";
import { MobileReviewDetailsComponent } from "./review-details/mobile-review-details/mobile-review-details.component";
import { DesktopReviewDetailsComponent } from "./review-details/desktop-review-details/desktop-review-details.component";
import { DonationDetailsComponent } from "./donation-details/donation-details/donation-details.component";
import { MobileDonationDetailsComponent } from "./donation-details/mobile-donation-details/mobile-donation-details.component";
import { DesktopDonationDetailsComponent } from "./donation-details/desktop-donation-details/desktop-donation-details.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from "src/app/core/shared/shared.module";

@NgModule({
  declarations: [
    MobileAhComponent,
    // DesktopAhComponent,
    ReviewDetailsComponent,
    MobileReviewDetailsComponent,
    DesktopReviewDetailsComponent,
    DonationDetailsComponent,
    MobileDonationDetailsComponent,
    DesktopDonationDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    ActiveAndHistoryRoutingModule,
    MatTabsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    SharedModule
  ],
})
export class ActiveAndHistoryModule {}
