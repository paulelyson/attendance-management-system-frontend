import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/User';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse {
  data: IUser;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    const body = { email, password };
    return this.http.post<ApiResponse>(environment.api_url + '/api/login', body).pipe(
      map((resp) => resp.data),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.error.message));
  }
}
