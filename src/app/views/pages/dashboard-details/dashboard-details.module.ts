import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import {
  NgbDropdownModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from "ng2-charts";

import { DashboardDetailsRoutingModule } from "./dashboard-details-routing.module";
import { SharedModule } from "src/app/core/shared/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { NgxPaginationModule } from "ngx-pagination";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import { DesktopDashboardComponent } from './dashboard/desktop-dashboard/desktop-dashboard.component';
import { MobileDashboardComponent } from './dashboard/mobile-dashboard/mobile-dashboard.component';
import { DashboardDetailsComponent } from "./dashboard/dashboard.component";
// import { GigdComponent } from "../general/gigd/gigd.component";

@NgModule({
  declarations: [
    DesktopDashboardComponent,
    MobileDashboardComponent,
    DashboardDetailsComponent
],
  imports: [
    CommonModule,
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ChartsModule,
    SharedModule,
    MatTabsModule,
    NgxPaginationModule,
    MatMenuModule,
    MatIconModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    DashboardDetailsRoutingModule,
  ],
  exports:[
    DesktopDashboardComponent,
    MobileDashboardComponent
  ]
})
export class DashboardDetailsModule {}
