import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActiveMultipleComponent } from "./multipleGig/active-multiple/active-multiple.component";
import { ActiveSingleComponent } from "./singleGig/active-single/active-single.component";

const routes: Routes = [
  {
    path: "singleVolunter",
    component: ActiveSingleComponent,
  },
  {
    path: "multipleVolunter",
    component: ActiveMultipleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveGigDetailsRoutingModule {}
