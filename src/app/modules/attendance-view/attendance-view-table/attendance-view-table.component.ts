import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AttendanceStatus, IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { BadgeType } from '../../shared/badge/badge.component';

interface StatusBadgeType {
  status: AttendanceStatus;
  type: BadgeType;
}

@Component({
  selector: 'app-attendance-view-table',
  templateUrl: './attendance-view-table.component.html',
  styleUrl: './attendance-view-table.component.css',
  standalone: false,
})
export class AttendanceViewTableComponent implements OnChanges {
  @Input() displayedColumns: string[] = ['date', 'user', 'reportsTo', 'timeIn', 'timeOut', 'status'];
  @Input() dataSource: IUserDailyAttendance[] = [];
  badge_types: StatusBadgeType[] = [
    {
      status: 'in_ontime',
      type: 'success',
    },
    {
      status: 'in_late',
      type: 'danger',
    },
    {
      status: 'out_ontime',
      type: 'success',
    },
  ];
  ngOnChanges(changes: SimpleChanges): void {
    console.log('datasourse', this.dataSource);
  }

  getbadgeType(status: AttendanceStatus): BadgeType {
    return this.badge_types.find((x) => x.status == status)?.type ?? 'primary';
  }
}
