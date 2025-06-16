import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../account/service/account.service';
import { CommonModule } from '@angular/common';
import { UserHasRoleDirective } from '../../account/security/user-has-role.directive';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UserHasRoleDirective],
  template: `
  <ng-container  *ngIf="accountService.user$ | async as user">
        <nav class="navbar navbar-expand-lg bg-white fixed-top border-bottom px-4">
  <div class="container-fluid">
    <!-- Left Logo -->
    <a class="navbar-brand" href="#" style="font-size: 2rem;">📚</a>
    <!-- Nav Links -->
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
        <li class="nav-item">
          <a class="nav-link btn btn-link cursor-pointer" [routerLink]="['/dashboard/home']" routerLinkActive="active"
                            [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
        </li>
        <ng-container *appUserHasRole="['Admin','HR']">
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Management
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item btn btn-link cursor-pointer" [routerLink]="['/dashboard/admin/department']">Departments</a></li>
            <li><a class="dropdown-item btn btn-link cursor-pointer" [routerLink]="['/dashboard/admin/designation']">Designations</a></li>
          </ul>
        </li>
          <li class="nav-item dropdown" *appUserHasRole="['Admin','HR']">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage Employee
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item btn btn-link cursor-pointer" [routerLink]="['/dashboard/admin/employee']">Employees</a></li>
          </ul>
        </li>
        </ng-container>

        <ng-container  >
           <li class="nav-item dropdown" *appUserHasRole="['Admin']">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage Tickets
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item btn btn-link cursor-pointer" [routerLink]="['/dashboard/admin/employee']">Create</a></li>
          </ul>
        </li>
        </ng-container>
       
        <!-- <li class="nav-item">
          <a class="nav-link" [routerLink]="['/student-course']" routerLinkActive="router-link-active">Courses</a>
        </li> -->
        
      </ul>

      <!-- Right Profile Dropdown -->
      <div class="dropdown d-flex align-items-center">
        <img src="favicon.ico" alt="Logo" width="40" height="40">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ user.firstName }} {{ user.lastName }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" [routerLink]="['/user-profile-details']">Profile</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li *appUserHasRole="['Admin']"><a class="dropdown-item" href="#">Orders</a></li>
          <li *appUserHasRole="['Admin']"><a class="dropdown-item" href="#">Books</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item btn btn-link cursor-pointer" (click)="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>

  </ng-container>
  `,
  styleUrl: './layout-navbar.component.css'
})
export class LayoutNavbarComponent {

  constructor(public accountService: AccountService) { }

  logout() {
    this.accountService.logout();
  }
}
