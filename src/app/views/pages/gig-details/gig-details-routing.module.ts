import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FundraisingDetailComponent } from "./fundraising/fundraising-detail/fundraising-detail.component";
import { MultipleGigDetailComponent } from "./multipleGig/multiple-gig-detail/multiple-gig-detail.component";
import { SingleGigDetailComponent } from "./singleGig/single-gig-detail/single-gig-detail.component";

const routes: Routes = [
  {
    path: "fundraising",
    component: FundraisingDetailComponent,
  },
  {
    path: "singleVolunter",
    component: SingleGigDetailComponent,
  },
  {
    path: "multipleVolunter",
    component: MultipleGigDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GigDetailsRoutingModule {}
