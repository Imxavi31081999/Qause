import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ActiveGigDetailsRoutingModule } from './active-gig-details-routing.module';
import { ActiveSingleComponent } from './singleGig/active-single/active-single.component';
import { MobileActiveSingleComponent } from './singleGig/mobile-active-single/mobile-active-single.component';
import { DesktopActiveSingleComponent } from './singleGig/desktop-active-single/desktop-active-single.component';
import { ActiveMultipleComponent } from './multipleGig/active-multiple/active-multiple.component';
import { MobileActiveMultipleComponent } from './multipleGig/mobile-active-multiple/mobile-active-multiple.component';
import { DesktopActiveMultipleComponent } from './multipleGig/desktop-active-multiple/desktop-active-multiple.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [ActiveSingleComponent, MobileActiveSingleComponent, DesktopActiveSingleComponent, ActiveMultipleComponent, MobileActiveMultipleComponent, DesktopActiveMultipleComponent],
  imports: [
    CommonModule,
    ActiveGigDetailsRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class ActiveGigDetailsModule { }
