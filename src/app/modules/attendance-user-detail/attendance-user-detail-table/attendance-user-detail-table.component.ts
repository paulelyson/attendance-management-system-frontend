import { Component, Input } from '@angular/core';
import { IUserAttendanceDetailByDay } from '../../../models/AttendanceUserDetail';

@Component({
  selector: 'app-attendance-user-detail-table',
  standalone: false,
  templateUrl: './attendance-user-detail-table.component.html',
  styleUrl: './attendance-user-detail-table.component.css'
})
export class AttendanceUserDetailTableComponent {
 @Input() displayedColumns: string[] = [];
  @Input() dataSource: IUserAttendanceDetailByDay[] = [];
}
