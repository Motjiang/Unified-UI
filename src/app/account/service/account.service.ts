import { Injectable } from '@angular/core';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  refreshUser(jwt: string | null): Observable<void> {
  if (jwt === null) {
    this.userSource.next(null);
    return of();
  }

  let headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

  return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, { headers }).pipe(
    map((user: User) => {
      if (user) {
        this.setUser(user);
      } else {
        this.userSource.next(null); // fallback just in case
      }
    })
  );
}


  login(model: Login) {
    return this.http.post<User>(`${environment.appUrl}/api/account/login`, model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }

  getJWT() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      return user.jwt;
    } else {
      return null;
    }
  }

  getUserRoles(): string[] {
  const jwt = this.getJWT();
  if (!jwt) return [];

  const decodedToken: any = jwtDecode(jwt);
  const role = decodedToken.role;

  // Ensure it's always returned as an array
  return typeof role === 'string' ? [role] : role;
}

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
