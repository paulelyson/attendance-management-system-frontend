import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUserDailyAttendance } from '../models/UserDailyAttendance';
import { environment } from '../../environments/environment';

interface ApiResponse {
  data: IUserDailyAttendance[] | IUserDailyAttendance;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserDailyAttendanceService {
  constructor(private http: HttpClient) {}

  getUserDailyAttendance(): Observable<IUserDailyAttendance[]> {
    return this.http.get<ApiResponse>(environment.api_url + '/api/dailyattendance').pipe(
      map((resp) => resp.data as IUserDailyAttendance[]),
      catchError(this.handleError)
    );
  }

  getDailyAttendanceByUserAndDate(user: string, date: Date): Observable<IUserDailyAttendance> {
    let params = new HttpParams();
    params = params.append('user', user);
    params = params.append('date', date.toISOString());
    return this.http.get<ApiResponse>(environment.api_url + '/api/dailyattendance/getbyuseranddate', { params }).pipe(
      map((resp) => resp.data as IUserDailyAttendance),
      catchError(this.handleError)
    );
  }

  userTimeIn(user: string): Observable<IUserDailyAttendance> {
    const body = { user };
    return this.http.post<ApiResponse>(environment.api_url + '/api/dailyattendance', body).pipe(
      map((resp) => resp.data as IUserDailyAttendance),
      catchError(this.handleError)
    );
  }

   userTimeOut(attendanceId: string): Observable<IUserDailyAttendance> {
    return this.http.patch<ApiResponse>(environment.api_url + '/api/dailyattendance/timeout/'+ attendanceId, {}).pipe(
      map((resp) => resp.data as IUserDailyAttendance),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
