import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDailyAttendanceService } from '../../../services/user-daily-attendance.service';
import { IUserDailyAttendance } from '../../../models/UserDailyAttendance';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { ISideFilter } from '../../../models/SideFilter';
import { IUser } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { americanDateToISODate, convertToAmericanFormat } from '../../../utils/date.util';
import { PageEvent } from '@angular/material/paginator';
import Pagination from '../../../models/Pagination';

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
  pagination = new Pagination(100, 1, 25, [5, 10, 25, 100]);
  constructor(
    private dailyAttendanceService: UserDailyAttendanceService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.userService.getUserDetail();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => this.queryParamsHandling(params));
  }

  getUserAttendance() {
    this.isloading.set(true);
    this.dailyAttendanceService.getUserDailyAttendance(this.filter).subscribe({
      next: (resp) => {
        this.attendances = resp;
      },
      complete: () => {
        this.isloading.set(false);
      },
    });
  }

  paginate(event: PageEvent) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/attendance-view'], navigationExtras);
  }

  queryParamsHandling(params: Params) {
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.filter.status = params['status'] ?? '';
    this.filter.startDate = params['startDate']
      ? new Date(params['startDate']).toLocaleString().split(',')[0]
      : new Date().toLocaleString().split(',')[0]; // american format eg 10/13/2025
    this.filter.endDate = params['endDate']
      ? new Date(params['endDate']).toLocaleString().split(',')[0]
      : new Date().toLocaleString().split(',')[0]; // american format eg 10/13/2025
    this.filter.reportsTo = this.user._id;
    this.getUserAttendance();
  }
}
