import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router, RouterLink } from '@angular/router';
import { ValidationMessagesComponent } from '../../shared/validation-messages/validation-messages.component';
import { take } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
     <div
      class="d-flex align-items-center justify-content-center bg-light"
      style="min-height: 100vh;"
    >
      <main class="form-signin w-100 ms-4 me-4" style="max-width: 400px;">
        <form [formGroup]="loginForm" (ngSubmit)="login()" autocomplete="off">
          <img
            class="mb-4"
             src="favicon.ico"
            alt=""
            width="40" height="40"
          />
          <h1 class="h3 mb-3 fw-normal">Unified 📚</h1>

          <div class="form-floating mb-3">
            <input
            formControlName="userName"
              type="text"
              class="form-control"
              id="floatingInput"
placeholder="Username (your email address)"  [class.is-invalid]="submitted && loginForm.get('userName')?.errors">
            <label for="floatingInput">Email address</label>
            <span class="text-danger" *ngIf="submitted && loginForm.get('userName')?.hasError('required')">
                        Username is required
                    </span>
          </div>

          <div class="form-floating mb-3">
            <input
            formControlName="password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password" [class.is-invalid]="submitted && loginForm.get('password')?.errors"/>
            <label for="floatingPassword">Password</label>
            <span class="text-danger" *ngIf="submitted && loginForm.get('password')?.hasError('required')">
                        Password is required
                    </span>
          </div>

          <div class="text-start mb-3">
            <a [routerLink]="['/account/send-email/forgot-password']"><em>Forgot Password?</em></a>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          <p class="mt-5 mb-3 text-muted text-center">
            &copy; {{ currentYear }} {{ companyName }}
          </p>
        </form>
      </main>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit  {
  currentYear = new Date().getFullYear();
  companyName = 'Unified book store. All Rights Reserved';

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) {
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user:User | null) => {
          this.router.navigateByUrl('/dashboard')
        }
      })
    }

    ngOnInit(): void {
    this.initializeForm();
  }

   initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: _ => {
          this.router.navigateByUrl('/dashboard');
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }
}
