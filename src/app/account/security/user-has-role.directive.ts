import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from '../service/account.service';
import { jwtDecode } from 'jwt-decode';

@Directive({
  selector: '[appUserHasRole]',
  standalone: true
})
export class UserHasRoleDirective implements OnInit {
  @Input() appUserHasRole: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          let userRoles = decodedToken.role;
          
          if (typeof userRoles === 'string') {
            userRoles = [userRoles];
          }

          if (Array.isArray(userRoles) && userRoles.some(role => this.appUserHasRole.includes(role))) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainerRef.clear();
          }
        } else {
          this.viewContainerRef.clear();
        }
      }
    });
  }
}
