import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceUserDetailRoutingModule } from './attendance-user-detail-routing.module';
import { AttendanceUserDetailComponent } from './attendance-user-detail/attendance-user-detail.component';
import { MatTableModule } from '@angular/material/table';
import { AttendanceUserDetailTableComponent } from './attendance-user-detail-table/attendance-user-detail-table.component';
import { InfoCardComponent } from '../shared/info-card/info-card.component';
@NgModule({
  declarations: [AttendanceUserDetailComponent, AttendanceUserDetailTableComponent],
  imports: [CommonModule, AttendanceUserDetailRoutingModule, MatTableModule, InfoCardComponent],
})
export class AttendanceUserDetailModule {}
