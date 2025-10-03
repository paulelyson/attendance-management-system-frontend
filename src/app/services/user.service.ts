import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/User';

interface ApiResponse {
  data: IUser[] | IUser;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<ApiResponse>(environment.api_url + '/api/user')
      .pipe(
        map((resp)=> resp.data as IUser[]),
        catchError(this.handleError));
  }

    getUserById(id: string): Observable<IUser> {
    return this.http.get<ApiResponse>(environment.api_url + '/api/user/' + id).pipe(
      map((resp) => resp.data as IUser),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
