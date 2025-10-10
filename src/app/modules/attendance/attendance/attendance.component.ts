import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AttendanceStatus, IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { IUser } from '../../../models/User';
import { BadgeType } from '../../shared/badge/badge.component';
import { SnackbarService } from '../../../services/snackbar.service';
import { ISnackBarConfig } from '../../shared/snackbar/snackbar.component';
import { UserAttendanceDetailService } from '../../../services/user-attendance-detail.service';
import { ISchedule, UserAttendanceDetailInterface } from '../../../models/AttendanceUserDetail';
import {
  convertTimeTo12HourFormat,
  getCurrentDayName,
  getScheduleByDayName,
} from '../../../utils/user-attendance-detail.util';
import { snakeCaseToString } from '../../../utils/string.util';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
  standalone: false,
})
export class AttendanceComponent implements OnInit {
  // attendance: IUserDailyAttendance | undefined;
  attendance: WritableSignal<IUserDailyAttendance | undefined> = signal(undefined);
  user: WritableSignal<IUser | undefined> = signal(undefined);
  userSchedule: WritableSignal<UserAttendanceDetailInterface | undefined> = signal(undefined);
  dateNow = new Date();
  userId: string = '68d8e43d10b67abecaf4114d';
  snackBarConfig: ISnackBarConfig = {
    type: 'primary',
    message: [],
    icon: 'info',
  };

  schedules: WritableSignal<string[]> = signal([]);

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userDailyAttendanceService: UserDailyAttendanceService,
    private userAttendanceDetailService: UserAttendanceDetailService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (resp) => this.user.set(resp),
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => this.queryParamsHandling(params));
  }

  get timeInStatus() {
    const timeInStatus: AttendanceStatus[] = ['in_late', 'in_ontime'];
    return this.attendance()?.status.filter((status) => timeInStatus.includes(status));
  }

  get timeOutStatus() {
    const timeOutStatus: AttendanceStatus[] = ['out_ontime', 'undertime'];
    return this.attendance()?.status.filter((status) => timeOutStatus.includes(status));
  }

  get timeInBadgeType(): BadgeType | undefined {
    return this.attendance()?.status.includes('in_ontime') ? 'success' : undefined;
  }

  get timeOutBadgeType(): BadgeType | undefined {
    return this.attendance()?.status.includes('out_ontime') ? 'success' : undefined;
  }

  getScheduleToday(): void {
    const today = getCurrentDayName();
    const sched = getScheduleByDayName(this.userSchedule() as UserAttendanceDetailInterface, today);
    const timeIn = 'Time In: ' + convertTimeTo12HourFormat(sched?.timeIn as string);
    const timeOut = 'Time Out: ' + convertTimeTo12HourFormat(sched?.timeOut as string);
    const breaks =
      sched?.break.map((x) => {
        const type = snakeCaseToString(x.type);
        const breakIn = convertTimeTo12HourFormat(x.breakIn);
        const breakOut = convertTimeTo12HourFormat(x.breakOut);
        return `${type}: ${breakIn} - ${breakOut}`;
      }) ?? [];
    this.schedules.update((sched) => [...sched, timeIn, timeOut, ...breaks]);
  }

  getUserAttendanceByDay() {
    let date = new Date();
    this.userDailyAttendanceService
      .getDailyAttendanceByUserAndDate(this.userId, date)
      .subscribe((resp) => {
        // this.attendance = resp;
        // this.cdr.detectChanges(); //this.cdr.markForCheck()
        this.attendance.set(resp);
      });
  }

  getUserScheduleByUserId() {
    this.userAttendanceDetailService.getUserAttendanceDetailByUserId(this.userId).subscribe({
      next: (resp) => {
        this.userSchedule.set(resp);
        this.getScheduleToday();
      },
    });
  }

  timeIn(): void {
    this.userDailyAttendanceService.userTimeIn(this.userId).subscribe({
      next: (resp) => {
        this.attendance.set(resp);
        this.snackBarConfig.type = 'success';
        this.snackBarConfig.message = ['Success time In.'];
        this.snackBarService.openSnackbar(this.snackBarConfig);
      },
      error: (err) => {
        this.snackBarConfig.message = [err.message];
        this.snackBarService.openSnackbar(this.snackBarConfig);
      },
    });
  }

  timeOut(): void {
    let id: string = this.attendance()?._id as string;
    this.userDailyAttendanceService.userTimeOut(id).subscribe({
      next: (resp) => this.attendance.set(resp),
      error: (err) => console.log(err),
    });
  }

  queryParamsHandling(params: Params) {
    this.getUserScheduleByUserId();
    this.getUserAttendanceByDay();
  }
}
