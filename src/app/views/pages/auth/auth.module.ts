import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { LoginComponent } from "./login/login.component";
// import { RegisterComponent } from "./register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
// import { PersonalComponent } from "./personal/personal.component";
import { NewloginComponent } from "./newlogin/newlogin.component";
import { PhonemailComponent } from "./phonemail/phonemail.component";
import { WelcomeUserComponent } from "./welcome-user/welcome-user.component";
// import { OtpComponent } from "./otp/otp.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { NotificationComponent } from "./notification/notification.component";
// import { CardComponent } from "./card/card.component";
// import { LocationComponent } from "./location/location.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AuthRoutingModule } from "./auth-routing.module";
import { DropdownModule } from "primeng/dropdown";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { SharedModule } from "src/app/core/shared/shared.module";

@NgModule({
  declarations: [
    // LoginComponent,
    // RegisterComponent,
    AuthComponent,
    // PersonalComponent,
    NewloginComponent,
    PhonemailComponent,

    // OtpComponent,
    // NotificationComponent,
    // CardComponent,
    // LocationComponent,
  ],
  // declarations: [LoginComponent, RegisterComponent, AuthComponent, LogintryComponent, PersonalComponent, NewloginComponent, PhonemailComponent, OtpComponent, WelcomeUserComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    AuthRoutingModule,
    DropdownModule,
    GooglePlaceModule,
    SharedModule,
  ],
  providers: [],
  // bootstrap: [ChipsAutocompleteExample],
})
export class AuthModule {}
