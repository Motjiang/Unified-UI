import { Injectable } from "@angular/core";
import { AccountService } from "../../../account/service/account.service";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { User } from "../../../account/models/user";
import { jwtDecode } from "jwt-decode";
import { NotificationService } from "../../../shared/service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private accountService: AccountService, private notificationService: NotificationService,
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
        this.notificationService.showNotification(false, 'Restricted Area', 'Leave now!');
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
