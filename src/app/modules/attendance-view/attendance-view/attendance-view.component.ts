import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-attendance-view',
  standalone: false,
  templateUrl: './attendance-view.component.html',
  styleUrl: './attendance-view.component.css',
})
export class AttendanceViewComponent implements OnInit {
  sidenav_opened: boolean = true;
  isloading: WritableSignal<boolean> = signal(false);
  attendances: IUserDailyAttendance[] = [];
  constructor(
    private dailyAttendanceService: UserDailyAttendanceService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => this.queryParamsHandling(params));
  }

  getUserAttendance() {
    this.isloading.set(true);
    this.dailyAttendanceService.getUserDailyAttendance().subscribe({
      next: (resp) => {
        this.attendances = resp;
      },
      complete: () => {
        console.log('wtf')
        this.isloading.set(false);
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.getUserAttendance();
  }
}
