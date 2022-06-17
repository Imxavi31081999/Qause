import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeahterIconModule } from "../../../core/feather-icon/feather-icon.module";

import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { GeneralComponent } from "./general.component";
import { BlankComponent } from "./blank/blank.component";
import { FaqComponent } from "./faq/faq.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { PricingComponent } from "./pricing/pricing.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { Routes, RouterModule } from "@angular/router";
import { PorfileWebComponent } from "./porfile-web/porfile-web.component";
import { SharedModule } from "src/app/core/shared/shared.module";
import { GigCongratsComponent } from "./gig-congrats/gig-congrats.component";

const routes: Routes = [
  {
    path: "",
    component: GeneralComponent,
    children: [
      {
        path: "",
        redirectTo: "blank-page",
        pathMatch: "full",
      },
      {
        path: "blank-page",
        component: BlankComponent,
      },

      {
        path: "gig-congrats",
        component: GigCongratsComponent,
      },

      {
        path: "faq",
        component: FaqComponent,
      },
      {
        path: "invoice",
        component: InvoiceComponent,
      },
      {
        path: "pricing",
        component: PricingComponent,
      },
      {
        path: "timeline",
        component: TimelineComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    GeneralComponent,
    BlankComponent,
    FaqComponent,
    InvoiceComponent,
    PricingComponent,
    TimelineComponent,
    PorfileWebComponent,
    GigCongratsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    SharedModule,
  ],
})
export class GeneralModule {}
