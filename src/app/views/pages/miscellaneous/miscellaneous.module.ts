import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MiscellaneousRoutingModule } from "./miscellaneous-routing.module";
import { AppliedForGigComponent } from "./appliedForGig/applied-for-gig.component";
import { CompletedTheGigComponent } from './completed-the-gig/completed-the-gig.component';
import { DesktopAppliedForGigComponent } from './appliedForGig/desktop-applied-for-gig/desktop-applied-for-gig.component';
import { MobileAppliedForGigComponent } from './appliedForGig/mobile-applied-for-gig/mobile-applied-for-gig.component';
import { MobileCompletedTheGigComponent } from './completed-the-gig/mobile-completed-the-gig/mobile-completed-the-gig.component';
import { DesktopCompletedTheGigComponent } from './completed-the-gig/desktop-completed-the-gig/desktop-completed-the-gig.component';

@NgModule({
  declarations: [AppliedForGigComponent, CompletedTheGigComponent, DesktopAppliedForGigComponent, MobileAppliedForGigComponent, MobileCompletedTheGigComponent, DesktopCompletedTheGigComponent],
  imports: [CommonModule, MiscellaneousRoutingModule],
})
export class MiscellaneousModule {}
