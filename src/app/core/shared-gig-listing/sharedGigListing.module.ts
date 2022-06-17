import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FundrasingRowComponent } from "./components/fundrasing-row/fundrasing-row.component";
import { SingleRowComponent } from "./components/single-row/single-row.component";
import { MultipleRowComponent } from "./components/multiple-row/multiple-row.component";
import {CarouselModule} from 'primeng/carousel';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    FundrasingRowComponent,
    SingleRowComponent,
    MultipleRowComponent,
  ],
  imports: [CommonModule, CarouselModule, SharedModule],
  exports: [FundrasingRowComponent, SingleRowComponent, MultipleRowComponent],
})
export class SharedGigListingModule {
}
