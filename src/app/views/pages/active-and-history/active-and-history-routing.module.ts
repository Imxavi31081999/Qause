import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MobileAhComponent } from "./ah/mobile-ah/mobile-ah.component";
import { DonationDetailsComponent } from "./donation-details/donation-details/donation-details.component";
import { ReviewDetailsComponent } from "./review-details/review-details/review-details.component";

const routes: Routes = [
  {
    path: "",
    component: MobileAhComponent,
  },
  {
    path: "donation-details",
    component: DonationDetailsComponent,
  },
  {
    path: "review-details",
    component: ReviewDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveAndHistoryRoutingModule {}
