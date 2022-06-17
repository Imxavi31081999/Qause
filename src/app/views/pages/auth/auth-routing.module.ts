import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { CardComponent } from "./card/card.component";
import { LocationComponent } from "./location/location.component";
import { LoginComponent } from "./login/login.component";
import { NewloginComponent } from "./newlogin/newlogin.component";
import { NotificationComponent } from "./notification/notification.component";
import { OtpComponent } from "./otp/otp.component";
import { PersonalComponent } from "./personal/personal.component";
import { PhonemailComponent } from "./phonemail/phonemail.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { OtpGuard } from "src/app/core/guard/otp.guard";
import { InfoSetupDuringRegisterGuard } from "src/app/core/guard/info-setup-during-register.guard";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "register",
        component: RegisterComponent,
        canActivate: [AuthGuard]
      },

      {
        path: "personal",
        component: PersonalComponent,
        canActivate:[InfoSetupDuringRegisterGuard]
      },
      {
        path: "newlogin",
        component: NewloginComponent,
      },

      {
        path: "phone",
        component: PhonemailComponent,
      },
      {
        path: "otp",
        component: OtpComponent,
        canActivate: [OtpGuard]
      },

      {
        path: "notification",
        component: NotificationComponent,
        canActivate:[InfoSetupDuringRegisterGuard]
      },
      {
        path: "card",
        component: CardComponent,
        canActivate:[InfoSetupDuringRegisterGuard]
      },
      {
        path: "location",
        component: LocationComponent,
        canActivate:[InfoSetupDuringRegisterGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
