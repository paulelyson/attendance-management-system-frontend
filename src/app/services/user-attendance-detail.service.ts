import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  IScheduleExt,
  IUserAttendanceDetailByDay,
  UserAttendanceDetailInterface,
} from '../models/AttendanceUserDetail';
import { getDisplayName, scheduleToScheduleExt } from '../utils/user-attendance-detail.util';

interface ApiResponse {
  data: UserAttendanceDetailInterface[] | UserAttendanceDetailInterface;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserAttendanceDetailService {
  constructor(private http: HttpClient) {}

  getUserAttendanceDetail(): Observable<IUserAttendanceDetailByDay[]> {
    return this.http.get<ApiResponse>(environment.api_url + '/api/userattendancedetail').pipe(
      map((resp) => {
        let mapped = (resp.data as UserAttendanceDetailInterface[]).map((data) => {
          let monday = data.schedule.find((sched) => sched.scheduleDay == 'monday');
          let tuesday = data.schedule.find((sched) => sched.scheduleDay == 'tuesday');
          let wednesday = data.schedule.find((sched) => sched.scheduleDay == 'wednesday');
          let thursday = data.schedule.find((sched) => sched.scheduleDay == 'thursday');
          let friday = data.schedule.find((sched) => sched.scheduleDay == 'friday');
          let saturday = data.schedule.find((sched) => sched.scheduleDay == 'saturday');
          let sunday = data.schedule.find((sched) => sched.scheduleDay == 'sunday');

          return {
            user: getDisplayName(data.user),
            monday: scheduleToScheduleExt(monday),
            tuesday: scheduleToScheduleExt(tuesday),
            wednesday: scheduleToScheduleExt(wednesday),
            thursday: scheduleToScheduleExt(thursday),
            friday: scheduleToScheduleExt(friday),
            saturday: scheduleToScheduleExt(saturday),
            sunday: scheduleToScheduleExt(sunday),
          };
        });
        return mapped;
      }),
      catchError(this.handleError)
    );
  }

  getUserAttendanceDetailByUserId(userId: string): Observable<UserAttendanceDetailInterface> {
    let params = new HttpParams();
    params = params.append('user', userId);
    return this.http
      .get<ApiResponse>(environment.api_url + '/api/userattendancedetail/getuserschedulebyuserid', { params })
      .pipe(
        map((resp) => resp.data as UserAttendanceDetailInterface),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
