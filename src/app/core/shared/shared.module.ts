import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchComponent } from "./components/search/search.component";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import {
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";

// import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from "@angular/material/autocomplete";

import { NgApexchartsModule } from "ng-apexcharts";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MobileFooterNavigationComponent } from "./mobile-footer-navigation/mobile-footer-navigation.component";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { DonationComponent } from "./components/donation/donation.component";
import { DialogModule } from "primeng/dialog";
import { FooterDesktopComponent } from "./components/footer-desktop/footer-desktop.component";
import { LoginComponent } from "src/app/views/pages/auth/login/login.component";

import { DropdownModule } from "primeng/dropdown";
import { OtpComponent } from "src/app/views/pages/auth/otp/otp.component";
import { RegisterComponent } from "src/app/views/pages/auth/register/register.component";
import { PersonalComponent } from "src/app/views/pages/auth/personal/personal.component";
import { LocationComponent } from "src/app/views/pages/auth/location/location.component";
import { CardComponent } from "src/app/views/pages/auth/card/card.component";
import { NotificationComponent } from "src/app/views/pages/auth/notification/notification.component";
import { LoginPopupComponent } from "./login-popup/login-popup.component";
import { RegisterPopupComponent } from "./register-popup/register-popup.component";
import { ProfileMyTaskComponent } from "./components/profile-my-task/profile-my-task.component";
import { ProfileExperienceTimelineComponent } from "./components/profile-experience-timeline/profile-experience-timeline.component";
import { ProfileAboutComponent } from "./components/profile-about/profile-about.component";
import { MatTabsModule } from "@angular/material/tabs";
import { ProfileHistoryComponent } from "./components/profile-history/profile-history.component";
import { OtpPopupComponent } from "./otp-popup/otp-popup.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import { MobileLocationComponent } from "src/app/views/pages/auth/location/mobile-location/mobile-location.component";
import { DesktopLocationComponent } from "src/app/views/pages/auth/location/desktop-location/desktop-location.component";
@NgModule({
  declarations: [
    NavbarComponent,
    SearchComponent,
    MobileFooterNavigationComponent,
    DonationComponent,
    FooterDesktopComponent,
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    PersonalComponent,
    LocationComponent,
    CardComponent,
    NotificationComponent,
    LoginPopupComponent,
    RegisterPopupComponent,
    ProfileMyTaskComponent,
    ProfileExperienceTimelineComponent,
    ProfileAboutComponent,
    ProfileHistoryComponent,
    OtpPopupComponent,
    MobileLocationComponent,
    DesktopLocationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    FeahterIconModule,
    NgbDropdownModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbModalModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    DialogModule,
  ],
  exports: [
    NavbarComponent,
    SearchComponent,
    MobileFooterNavigationComponent,
    DonationComponent,
    FooterDesktopComponent,
    ProfileMyTaskComponent,
    ProfileExperienceTimelineComponent,
    ProfileAboutComponent,
    MobileLocationComponent,
    DesktopLocationComponent,
  ],
})
export class SharedModule {}
