import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserAttendanceDetailService } from '../../../services/user-attendance-detail.service';
import { IUserAttendanceDetailByDay } from '../../../models/AttendanceUserDetail';

@Component({
  selector: 'app-attendance-user-detail',
  templateUrl: './attendance-user-detail.component.html',
  styleUrl: './attendance-user-detail.component.css',
  standalone: false,
})
export class AttendanceUserDetailComponent implements OnInit {
  userAttendanceDetail: IUserAttendanceDetailByDay[] = [];
  headers: string[] = [
    'user',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  constructor(
    private userAttendanceDetailService: UserAttendanceDetailService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userAttendanceDetailService.getUserAttendanceDetail().subscribe({
      next: (resp) => {
        this.userAttendanceDetail =resp;
        this.cdr.detectChanges()
      },
      complete: () => console.log(this.userAttendanceDetail),
    });
  }

  // mappedUserSchedule(schedules: IUserAttendanceDetailByDay[]) {
  //   return schedules.map(sched=> {
  //     sched.
  //   })
  // }
}
