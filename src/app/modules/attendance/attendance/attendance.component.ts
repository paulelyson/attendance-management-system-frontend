import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AttendanceStatus, IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { IUser } from '../../../models/User';

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
  // timeInStatus: WritableSignal<AttendanceStatus> = signal('in_ontime');
  dateNow = new Date();
  userId: string = '68d8e43d10b67abecaf4114d';
  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userDailyAttendanceService: UserDailyAttendanceService
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

  timeIn(): void {
    this.userDailyAttendanceService.userTimeIn(this.userId).subscribe({
      next: (resp) => this.attendance.set(resp),
    });
  }

  timeOut(): void {
    let id: string = this.attendance()?._id as string;
    this.userDailyAttendanceService.userTimeOut(id).subscribe({
      next: (resp) => this.attendance.set(resp),
    });
  }

  queryParamsHandling(params: Params) {
    this.getUserAttendanceByDay();
  }
}
