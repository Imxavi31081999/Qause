import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { ProfileComponent } from "./profile/profile/profile.component";
import { DesktopProfileComponent } from "./profile/desktop-profile/desktop-profile.component";
import { MobileProfileComponent } from "./profile/mobile-profile/mobile-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile/edit-profile.component";
import { MobileEditProfileComponent } from "./edit-profile/mobile-edit-profile/mobile-edit-profile.component";
import { DesktopEditProfileComponent } from "./edit-profile/desktop-edit-profile/desktop-edit-profile.component";
import { SharedModule } from "src/app/core/shared/shared.module";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    ProfileComponent,
    DesktopProfileComponent,
    MobileProfileComponent,
    EditProfileComponent,
    MobileEditProfileComponent,
    DesktopEditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    GooglePlaceModule,
    SharedModule,
    FeahterIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    DropdownModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    DialogModule,
  ],
})
export class UserProfileModule {}
