import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesktopGigComponent } from "../dashboard/desktop-gig/desktop-gig.component";
import { SingleGigDetailComponent } from "../gig-details/singleGig/single-gig-detail/single-gig-detail.component";
import { DashboardDetailsComponent } from "./dashboard/dashboard.component"; 
import { SharedModule } from "src/app/core/shared/shared.module";
const routes: Routes = [
    {
      path: "",
      component: DashboardDetailsComponent,
    },
    //this need to be changed based on the conditions for signle gig details, multiple and fundraising
    {
      path: "gigs",
      component: DesktopGigComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardDetailsRoutingModule {}