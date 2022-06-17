import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppliedForGigComponent } from "./appliedForGig/applied-for-gig.component";
import { CompletedTheGigComponent } from "./completed-the-gig/completed-the-gig.component";

const routes: Routes = [
  {
    path: "applied-for-gig",
    component: AppliedForGigComponent,
  },
  {
    path: "completed-the-gig",
    component: CompletedTheGigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {}
