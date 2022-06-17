import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile/edit-profile.component";
import { ProfileComponent } from "./profile/profile/profile.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
