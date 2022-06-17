import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GigListingComponent } from "./gig-listing/gig-listing.component";

const routes: Routes = [
  {
    path: "",
    component: GigListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GigListingRoutingModule {}
