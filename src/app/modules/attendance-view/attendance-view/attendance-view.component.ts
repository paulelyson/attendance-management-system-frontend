import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { ActivatedRoute, Params } from '@angular/router';
import { ISideFilter } from '../../../models/SideFilter';
import { IUser } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { americanDateToISODate, convertToAmericanFormat } from '../../../utils/date.util';

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
  filter: ISideFilter = {};
  user: IUser;
  constructor(
    private dailyAttendanceService: UserDailyAttendanceService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = this.userService.getUserDetail();
  }

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
        this.isloading.set(false);
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.filter.status = params['status'] ?? '';
    this.filter.startDate =
      new Date(params['startDate']).toLocaleString().split(',')[0] ??
      new Date().toLocaleString().split(',')[0]; // american format eg 10/13/2025
    this.filter.endDate =
      new Date(params['endDate']).toLocaleString().split(',')[0] ??
      new Date().toLocaleString().split(',')[0]; // american format eg 10/13/2025
    this.filter.reportsTo = this.user._id;
    this.getUserAttendance();
  }
}
