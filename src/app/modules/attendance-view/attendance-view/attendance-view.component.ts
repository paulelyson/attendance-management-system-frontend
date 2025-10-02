import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { IUserDailyAttendance } from '../../../models/UserDailyAttendance';

@Component({
  selector: 'app-attendance-view',
  standalone: false,
  templateUrl: './attendance-view.component.html',
  styleUrl: './attendance-view.component.css',
})
export class AttendanceViewComponent implements OnInit {
  sidenav_opened: boolean = true
  attendances: IUserDailyAttendance[] = [];
  constructor(
    private dailyAttendanceService: UserDailyAttendanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dailyAttendanceService.getUserDailyAttendance().subscribe({
      next: (resp) => {
        this.attendances = resp;
        this.cdr.detectChanges()
      },
    });
  }
}
