import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTaskComponent } from './activity-task/activity-task.component';
import { DesktopActivityTaskComponent } from './desktop-activity-task/desktop-activity-task.component';
import { MobileActivityTaskComponent } from './mobile-activity-task/mobile-activity-task.component';



@NgModule({
  declarations: [ActivityTaskComponent, DesktopActivityTaskComponent, MobileActivityTaskComponent],
  imports: [
    CommonModule
  ]
})
export class SharedActiveHistoryModule { }
