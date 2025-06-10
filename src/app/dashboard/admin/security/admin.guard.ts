import { Injectable } from "@angular/core";
import { AccountService } from "../../../account/service/account.service";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { User } from "../../../account/models/user";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          let userRoles = decodedToken.role;

          // Ensure it's an array
          if (typeof userRoles === 'string') {
            userRoles = [userRoles];
          }

          const allowedRoles = ['Admin', 'HR'];

          if (Array.isArray(userRoles) && userRoles.some(role => allowedRoles.includes(role))) {
            return true;
          }
        }

        this.router.navigateByUrl('/');
        return false;
      })
    );
  }

}
