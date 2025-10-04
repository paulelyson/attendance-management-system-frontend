import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing-module';
import { ButtonComponent } from '../shared/button/button.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { InfoCardComponent } from '../shared/info-card/info-card.component';
import { BadgeComponent } from '../shared/badge/badge.component';
import { TwelveHourTimePipe } from '../../pipes/twelve-hour-time.pipe';


@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    ButtonComponent,
    InfoCardComponent,
    BadgeComponent,
    TwelveHourTimePipe
  ]
})
export class AttendanceModule { }
