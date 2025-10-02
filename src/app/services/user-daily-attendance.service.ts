import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUserDailyAttendance } from '../models/UserDailyAttendance';
import { environment } from '../../environments/environment';

interface ApiResponse {
  data: IUserDailyAttendance[];
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserDailyAttendanceService {
  constructor(private http: HttpClient) {}

  getUserDailyAttendance(): Observable<IUserDailyAttendance[]> {
    return this.http
      .get<ApiResponse>(environment.api_url + '/api/dailyattendance')
      .pipe(
        map((resp) => resp.data),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
