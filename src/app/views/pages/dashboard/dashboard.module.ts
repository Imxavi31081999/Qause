import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
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

import { DashboardComponent } from "./dashboard.component";
import { GigComponent } from "./gig/gig.component";
import { SharedModule } from "src/app/core/shared/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MobileGigComponent } from "./mobile-gig/mobile-gig.component";
import { NgxPaginationModule } from "ngx-pagination";
import { DesktopGigComponent } from "./desktop-gig/desktop-gig.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
// import { GigdComponent } from "../general/gigd/gigd.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "gigs",
    component: GigComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    GigComponent,
    MobileGigComponent,
    DesktopGigComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
  ],
})
export class DashboardModule {}
