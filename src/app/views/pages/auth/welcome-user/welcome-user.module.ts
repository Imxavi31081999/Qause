import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeUserComponent } from './welcome-user.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeUserComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class WelcomeUserModule { }
