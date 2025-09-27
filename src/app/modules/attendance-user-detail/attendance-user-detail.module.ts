import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceUserDetailRoutingModule } from './attendance-user-detail-routing.module';
import { TableComponent } from '../shared/table/table.component';
import { AttendanceUserDetailComponent } from './attendance-user-detail/attendance-user-detail.component';
@NgModule({
  declarations: [AttendanceUserDetailComponent],
  imports: [CommonModule, AttendanceUserDetailRoutingModule, TableComponent],
})
export class AttendanceUserDetailModule {
  
}
