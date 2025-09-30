import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceViewRoutingModule } from './attendance-view-routing-module';
import { BadgeComponent } from '../shared/badge/badge.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { AttendanceViewTableComponent } from './attendance-view-table/attendance-view-table.component';
import { MatTableModule } from '@angular/material/table';
import { TwelveHourTimePipe } from '../../pipes/twelve-hour-time.pipe';

@NgModule({
  declarations: [AttendanceViewComponent, AttendanceViewTableComponent],
  imports: [
    CommonModule,
    AttendanceViewRoutingModule,
    BadgeComponent,
    MatTableModule,
    TwelveHourTimePipe,
  ],
})
export class AttendanceViewModule {}
