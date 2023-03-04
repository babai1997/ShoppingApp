import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdminAuthenticated = false;
  private isUserAuthenticated = false;
  private userId: string;
  private adminId: string;
  private authStatusListener = new Subject<boolean>();
  private authUserIdListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string, type: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      type: type,
    };

    this.http
      .post<{ message: string; type: string; id: string }>(
        'http://localhost:3000/api/signup',
        authData
      )
      .subscribe((response) => {
        console.log(response.type);
        if (response.type == 'admin') {
          this.router.navigate(['/create']);
        } else {
          this.isUserAuthenticated = true;
          this.authStatusListener.next(true);
          this.userId = response.id;
          this.router.navigate(['/']);
        }
      });
  }

  login(email: string, password: string) {
    const authData: { email: string; password: string } = {
      email: email,
      password: password,
    };
    this.http
      .post<{ message: string; type: string; id: string }>(
        'http://localhost:3000/api/login',
        authData
      )
      .subscribe((response) => {
        if (response.message === 'Auth failed!') {
          console.log('User not exist!');
        }
        if (response.type === 'user') {
          this.isUserAuthenticated = true;
          this.authStatusListener.next(true);
          this.userId = response.id;
          this.authUserIdListener.next(this.userId);
          this.router.navigate(['/']);
        } else {
          this.isAdminAuthenticated = true;
          this.adminId = response.id;
          this.router.navigate(['/create']);
        }
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthUserIdListener() {
    return this.authUserIdListener.asObservable();
  }

  getIsAdminAuth() {
    return this.isAdminAuthenticated;
  }

  getIsUserAuth() {
    return this.isUserAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAdminId() {
    return this.adminId;
  }

  logout() {
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
