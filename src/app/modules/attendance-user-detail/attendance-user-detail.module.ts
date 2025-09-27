import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceUserDetailRoutingModule } from './attendance-user-detail-routing.module';
import { TableComponent } from '../shared/table/table.component';
import { AttendanceUserDetailComponent } from './attendance-user-detail/attendance-user-detail.component';
import { MatTableModule } from '@angular/material/table';
import { AttendanceUserDetailTableComponent } from './attendance-user-detail-table/attendance-user-detail-table.component';
@NgModule({
  declarations: [AttendanceUserDetailComponent, AttendanceUserDetailTableComponent],
  imports: [CommonModule, AttendanceUserDetailRoutingModule, MatTableModule],
})
export class AttendanceUserDetailModule {}
